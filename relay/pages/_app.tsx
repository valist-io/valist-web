import { AppProps } from 'next/app';
import getConfig from 'next/config';
import React, { useEffect, useState } from 'react';

import Valist from 'valist';
import { Magic } from 'magic-sdk';
import ValistContext from '../components/Valist/ValistContext';
import LoginContext from '../components/Login/LoginContext';
import getProviders from '../utils/providers';

import LoadingDialog from '../components/LoadingDialog/LoadingDialog';
import LoginForm from '../components/Login/LoginForm';

import '../styles/main.css';

type ProviderType = 'magic' | 'metaMask' | 'readOnly';

const { publicRuntimeConfig } = getConfig();

function App({ Component, pageProps }: AppProps) {
  const [valist, setValist] = useState<Valist>();
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [magic, setMagic] = useState<Magic | undefined>();
  const [account, setAccount] = useState();

  const handleLogin = async (providerType: ProviderType) => {
    const providers = getProviders(setMagic, setLoggedIn, email);
    let provider;

    try {
      provider = await providers[providerType]();
      window.localStorage.setItem('loginType', providerType);
    } catch (e) {
      console.log('Could not set provider, falling back to readOnly', e);
      provider = await providers.readOnly();
      window.localStorage.setItem('loginType', 'readOnly');
    }

    try {
      const valistInstance = new Valist({
        web3Provider: provider,
        metaTx: provider === publicRuntimeConfig.WEB3_PROVIDER ? false : publicRuntimeConfig.METATX_ENABLED,
      });

      await valistInstance.connect();
      setValist(valistInstance);
      console.log('Current Account: ', valistInstance.defaultAccount);
      (window as any).valist = valistInstance;
    } catch (e) {
      console.error('Could not initialize Valist object', e);

      try {
        await handleLogin('readOnly');
      } catch (loginError) {
        console.error('Critical error, could not login with desired method or readOnly', loginError);
      }
    }
  };

  const loginObject = {
    setShowLogin,
    loggedIn,
    logOut: async () => {
      window.localStorage.clear();
      setShowLogin(false);
      setLoggedIn(false);
      if (magic) {
        magic.user.logout();
        setMagic(undefined);
      }
      await handleLogin('readOnly');
    },
  };

  useEffect(() => {
    (async () => {
      // check login type on first load and set provider to previous state
      const loginType = window.localStorage.getItem('loginType');

      if (loginType === 'readOnly' || loginType === 'magic' || loginType === 'metaMask') {
        await handleLogin(loginType);
      } else {
        await handleLogin('readOnly');
        window.localStorage.setItem('loginType', 'readOnly');
      }
    })();

    (window as any).ethereum.on('accountsChanged', (accounts: any) => {
      setAccount(accounts[0]);
    });
  }, [account]);

  return (
    <LoginContext.Provider value={loginObject}>
      { valist
        ? <ValistContext.Provider value={valist}>
          <Component loggedIn={loggedIn} setShowLogin={setShowLogin} {...pageProps} />
          { showLogin && <LoginForm setShowLogin={setShowLogin} handleLogin={handleLogin} setEmail={setEmail} /> }
        </ValistContext.Provider>
        : <LoadingDialog>Loading...</LoadingDialog>}
    </LoginContext.Provider>
  );
}

export default App;
