import { useLazyQuery } from '@apollo/client';
import type { NextPage } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '../components/Accounts/AccountContext';
import Layout from '../components/Layouts/Main';
import Accordion from '../components/Publishing/Accordion';
import CreateProjectForm from '../components/Publishing/CreateProjectForm';
import CreateTeamForm from '../components/Publishing/CreateTeamForm';
import ProjectPreview from '../components/Publishing/ProjectPreview';
import PublishReleaseForm from '../components/Publishing/CreateReleaseForm';
import ReleasePreview from '../components/Publishing/ReleasePreview';
import TeamPreview from '../components/Publishing/TeamPreview';
import ValistContext from '../components/Valist/ValistContext';
import { USER_TEAMS } from '../utils/Apollo/queries';
import CreateLicenseForm from '../components/Publishing/CreateLicenseForm';
import LicensePreview from '../components/Publishing/LicensePreview';
import { ReleaseMeta, ArtifactMeta, LicenseMeta } from '@valist/sdk';
import { TransactionAPI } from '@valist/sdk/dist/contract';
import { BigNumberish } from 'ethers';

type Member = {
  id: string,
}

const CreatePage: NextPage = () => {
  const accountCtx = useContext(AccountContext);
  const valistCtx = useContext(ValistContext);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  // Get sepcific action/task from query params
  let { action } = router.query;
  if (Array.isArray(action)) {
    action = action.join('');
  }
  if (!action) {
    action = '';
  }

  // Page State
  const [view, setView] = useState<string>('');
  const [renderTeam, setRenderTeam] = useState<boolean>(false);
  const [renderProject, setRenderProject] = useState<boolean>(false);
  const [renderRelease, setRenderRelease] = useState<boolean>(false);
  const [renderLicense, setRenderLicense] = useState<boolean>(false);
  const [ getData, { data, loading, error }] = useLazyQuery(USER_TEAMS);
  const [userTeams, setUserTeams] = useState<any>({});
  const [userTeamNames, setUserTeamNames] = useState<any>([]);
  const [teamProjectNames, setTeamProjectNames] = useState<any>([]);
  const [teamsCreated, setTeamsCreated] = useState<number>(0);

  // Team State
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [teamName, setTeamName] = useState<string>('teamName');
  const [teamDescription, setTeamDescription] = useState<string>('An example team description.');
  const [teamWebsite, setTeamWebsite] = useState<string>('');
  const [teamBeneficiary, setTeamBeneficiary] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [teamMembersParsed, setTeamMembersParsed] = useState<Member[]>([]);

  // Project State
  const [projectTeam, setProjectTeam] = useState<string>('');
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectName, setProjectName] = useState<string>('projectName');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [projectWebsite, setProjectWebsite] = useState<string>('');
  const [projectMembers, setProjectMembers] = useState<string[]>([]);
  const [projectMembersParsed, setprojectMembersParsed] = useState<Member[]>([]);

  // Release State
  const [releaseImage, setReleaseImage] = useState<File | null>(null);
  const [releaseTeam, setReleaseTeam] = useState<string>('');
  const [releaseProject, setReleaseProject] = useState<string>('');
  const [releaseName, setReleaseName] = useState<string>('0.0.1');
  const [releaseDescription, setReleaseDescription] = useState<string>('');
  const [releaseWebsite, setReleaseWebsite] = useState<string>('');
  const [releaseFiles, setReleaseFiles] = useState<any>({});
  const [releaseArchs, setReleaseArchs] = useState<string[]>([]);
  const [releaseLicenses, setReleaseLicenses] = useState<string[]>([]);
  const [releaseLicense, setReleaseLicense] = useState<string[]>([]);

  // License State
  const [licenseImage, setLicenseImage] = useState<File | null>(null);
  const [licenseTeam, setLicenseTeam] = useState<string>('');
  const [licenseProject, setLicenseProject] = useState<string>('');
  const [licenseName, setLicenseName] = useState<string>('');
  const [licenseDescription, setLicenseDescription] = useState<string>('');
  const [licnesePrice, setLicensePrice] = useState<BigNumberish>(0);

  // Set which sections/steps to render
  useEffect(() => {
    setRenderTeam(action === 'team');
    setRenderProject(action === 'project');
    setRenderRelease(action === 'release');
    setRenderLicense(action === 'license');
    setView(action as string);
  }, [action]);

  useEffect(() => {
    (async () => {
      await getData( {
        variables: { address: accountCtx.address.toLowerCase() },
      });
    })();
  }, [accountCtx.address, getData, teamsCreated]);

  // Set page state for user's teams and projects
  useEffect(() => {
    if (data && data?.users && data?.users[0] && data?.users[0].teams) {
      const rawTeams = data.users[0].teams;
      const teamNames = [];
      let teams:any = {};

      for (let i = 0; i < rawTeams.length; i++) {
        teams[rawTeams[i].name] = rawTeams[i];
        teamNames.push(rawTeams[i].name);
      }
      setUserTeams(teams);
      setUserTeamNames(teamNames);

      if (teamNames.length > 0) {
        setProjectTeam(teamNames[0]);
        setReleaseTeam(teamNames[0]);
        setLicenseTeam(teamNames[0]);
        if (data.users[0].teams[0].projects) {
          const projectNames = [];
          for (const name of data.users[0].teams[0].projects) {
            projectNames.push(name.name);
          }
          setTeamProjectNames(projectNames);
          setReleaseProject(projectNames[0]);
          setLicenseProject(projectNames[0]);
        }
      }
    }
  }, [data]);

  // If the selected releaseTeam changes set the projectNames under that team
  useEffect(() => {
    (async () => {
      if (releaseTeam) {
        const projectNames = [];
        for (const name of userTeams[releaseTeam].projects) {
          projectNames.push(name.name);
        }
        setTeamProjectNames(projectNames);
        setReleaseProject(projectNames[0] || '');
      }
    })();
  }, [releaseTeam, userTeams]);

    // If the selected licenseTeam changes set the projectNames under that team
    useEffect(() => {
      (async () => {
        if (licenseTeam) {
          const projectNames = [];
          for (const name of userTeams[licenseTeam].projects) {
            projectNames.push(name.name);
          }
          setTeamProjectNames(projectNames);
          setLicenseProject(projectNames[0] || '');
        }
      })();
    }, [licenseTeam, userTeams]);

  // Normalize teamMember data for TeamPreview component
  useEffect(() => {
    const members:Member[] = [];
    for (const teamMember of teamMembers) {
      members.push({
        id: teamMember,
      });
    }
    setTeamMembersParsed(members);
  }, [teamMembers]);

  // Normalize projectMember data for ProjectPreview component
  useEffect(() => {
    const members:Member[] = [];
    for (const projectMember of projectMembers) {
      members.push({
        id: projectMember,
      });
    }
    setprojectMembersParsed(members);
  }, [projectMembers]);

  useEffect(() => {
    (async () => {
      try {
        const licenses = await valistCtx.valist.contract.getLicenseNames(
          releaseTeam,
          releaseProject,
          0,
          1000,
        );

        setReleaseLicenses(licenses);
        setReleaseLicense([licenses[0]]);
      } catch (err) {
        console.log('err', err);
      }
    })();
  }, [releaseProject, releaseTeam, valistCtx.valist.contract]);

  // Wrap Valist Sdk calls for create (team, project release)
  const createTeam = async () => {
    let imgURL = "";

    if (teamImage) {
      const imgCID = await valistCtx.valist.storage.write(teamImage);
      imgURL = `${publicRuntimeConfig.IPFS_GATEWAY}${imgCID}`;
    }

    const meta = {
      image: imgURL,
      name: teamName,
      description: teamDescription,
      external_url: teamWebsite,
    };

    console.log("Beneficiary", teamBeneficiary);
    console.log("Team Name", teamName);
    console.log("Team Members", teamMembers);
    console.log("Meta", meta);

    let toastID = '';
    try { 
      toastID = accountCtx.notify('transaction');
      const transaction = await valistCtx.valist.createTeam(
        teamName,
        meta,
        teamBeneficiary,
        teamMembers,
      );
      await transaction.wait();

      setUserTeamNames([...userTeamNames, teamName]);
      accountCtx.dismiss(toastID);
      accountCtx.notify('success');
      router.push('/create?action=project');
    } catch(err) {
      accountCtx.dismiss(toastID);
      accountCtx.notify('error');
    }
  };

  const createProject = async () => {
    let imgURL = "";

    if (projectImage) {
      const imgCID = await valistCtx.valist.storage.write(projectImage);
      imgURL = `${publicRuntimeConfig.IPFS_GATEWAY}${imgCID}`;
    }

    const meta = {
      image: imgURL,
      name: projectName,
      description: projectDescription,
      external_url: projectWebsite,
     };

     console.log("Project Team", projectTeam);
     console.log("Project Name", projectName);
     console.log("Project Members", projectMembers);
     console.log("Meta", meta);

     let toastID = '';
     try { 
      toastID = accountCtx.notify('transaction');
      const transaction = await valistCtx.valist.createProject(
        projectTeam,
        projectName,
        meta,
        projectMembers,
      );
      await transaction.wait();

      accountCtx.dismiss(toastID);
      accountCtx.notify('success');
      router.push('/');
    } catch(err) {
      console.log('Error', err);
      accountCtx.dismiss(toastID);
      accountCtx.notify('error', String(err));
    }
  };

  const createRelease = async () => {
    let imgURL = "";

    if (releaseImage) {
      const imgCID = await valistCtx.valist.storage.write(releaseImage);
      imgURL = `${publicRuntimeConfig.IPFS_GATEWAY}${imgCID}`;
    }

    const release = new ReleaseMeta();
		release.image = imgURL;
		release.name = releaseName;
		release.description = releaseDescription;
		release.external_url = releaseWebsite;
    release.licenses = releaseLicense;
		release.artifacts = new Map<string, ArtifactMeta>();

    if (releaseFiles) {
      for (let i = 0; i < Object.keys(releaseFiles).length; i++) {
        const artifactCID = await valistCtx.valist.storage.write(releaseFiles[i]);
        const artifact = new ArtifactMeta();
        artifact.provider = artifactCID;

        release.artifacts.set(releaseArchs[i], artifact);
      }
    }

    console.log("Release Team", releaseTeam);
    console.log("Release Project", releaseProject);
    console.log("Release Name", releaseName);
    console.log("Meta", release);

    let toastID = '';
    try {
      toastID = accountCtx.notify('transaction');
      const transaction = await valistCtx.valist.createRelease(
        releaseTeam,
        releaseProject,
        releaseName,
        release,
      );
      await transaction.wait();
      
      accountCtx.dismiss(toastID);
      accountCtx.notify('success');
      router.push('/');
    } catch(err) {
      console.log('Error', err);
      accountCtx.dismiss(toastID);
      accountCtx.notify('error', String(err));
    }
  };

  const createLicense = async () => {
    let imgURL = "";

    if (licenseImage) {
      const imgCID = await valistCtx.valist.storage.write(licenseImage);
      imgURL = `${publicRuntimeConfig.IPFS_GATEWAY}${imgCID}`;
    }

    const license = new LicenseMeta();
		license.image = imgURL,
		license.name = licenseName,
		license.description = licenseDescription,
		license.external_url = '',

    console.log("License Team", licenseTeam);
    console.log("License Project", licenseProject);
    console.log("License Name", licenseName);
    console.log("Meta", license);

    let toastID = '';
    try {
      toastID = accountCtx.notify('transaction');
      const transaction = await valistCtx.valist.createLicense(
        licenseTeam,
        licenseProject,
        licenseName,
        license,
        licnesePrice,
      );
      await transaction.wait();
      
      accountCtx.dismiss(toastID);
      accountCtx.notify('success');
      router.push('/');
    } catch(err) {
      console.log('Error', err);
      accountCtx.dismiss(toastID);
      accountCtx.notify('error', String(err));
    }
  };

  // Render preview based on view state
  const renderPreview = (view: string) => {
    switch (view) {
      case 'team':
        return (<TeamPreview
        teamDescription={teamDescription}
        teamName={teamName}
        teamImage={teamImage}
        teamMembers={teamMembersParsed}/>);
      case 'project':
        return <ProjectPreview 
        teamName={projectTeam} 
        projectName={projectName} 
        projectImage={projectImage} 
        projectDescription={projectDescription} 
        projectMembers={projectMembersParsed} 
      />;
      case 'release':
        return <ReleasePreview 
        releaseTeam={releaseTeam}
        releaseProject={releaseProject}
        releaseName={releaseName} 
        releaseImage={releaseImage}
        releaseDescription={releaseDescription}            
      />;
      case 'license':
        return <LicensePreview 
        licenseTeam={licenseTeam}
        licenseProject={licenseProject}
        licenseName={licenseName} 
        licenseImage={licenseImage}
        licenseDescription={licenseDescription}            
      />;
      default:
        return (<div>Action Not Found</div>);
    }
  };

  return (
    <Layout title={`Valist | Create ${view}`}>
      <div className="grid grid-cols-1 gap-4 items-start gap-y-6 lg:grid-cols-12 lg:gap-8">
        {/* Right Column */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 lg:col-span-5">
          {renderTeam && <Accordion view={view} name={'team'} setView={setView} title={<div><span className='mr-4'></span>Create a Team or Personal Account</div>}>
            <div className="p-4">
              <CreateTeamForm
                teamName={teamName} 
                teamMembers={teamMembers} 
                teamDescription={teamDescription}
                teamWebsite={teamWebsite}   
                setName={setTeamName}
                setImage={setTeamImage}
                setDescription={setTeamDescription}
                setWebsite={setTeamWebsite}
                setMembers={setTeamMembers}
                setBeneficiary={setTeamBeneficiary}
                submitText={(action != 'project') ? 'Create Team' : 'Continue to Project'}
                submit={createTeam}        
              />
            </div>
          </Accordion>}

          {renderProject && <Accordion view={view} name={'project'} setView={setView} title={<div><span className='mr-4'></span>Create a New Project</div>}>
            <div className="p-4">
              <CreateProjectForm
                projectName={''}
                projectDescription={''}
                projectWebsite={''}
                userTeams={userTeamNames}
                setView={setView}
                setRenderTeam={setRenderTeam}
                setName={setProjectName}
                setImage={setProjectImage}
                setDescription={setProjectDescription}
                setWebsite={setProjectWebsite}
                setMembers={setProjectMembers}
                submit={createProject}
                setTeam={setProjectTeam}              
              />
            </div>
          </Accordion>}

          {renderRelease && <Accordion view={view} name={'release'} setView={setView} title={<div><span className='mr-4'> </span>Publish Release</div>}>
            <div className="p-4">
              <PublishReleaseForm
                teamNames={userTeamNames}
                projectNames={teamProjectNames}
                releaseTeam={releaseTeam}
                releaseProject={releaseProject}
                releaseName={releaseName}
                releaseFiles={releaseFiles}
                rleaseLicenses={releaseLicenses}
                archs={releaseArchs}
                setImage={setReleaseImage}
                setTeam={setReleaseTeam}
                setProject={setReleaseProject}
                setName={setReleaseName}
                setDescription={setReleaseDescription}
                setFiles={setReleaseFiles}
                setArchs={setReleaseArchs}
                setLicense={setReleaseLicense}
                setRenderTeam={setRenderTeam}
                setRenderProject={setRenderProject}
                submit={() => {createRelease();}}
                setView={setView} 
              />
            </div>
          </Accordion>}

          {renderLicense && <Accordion view={view} name={'license'} setView={setView} title={<div><span className='mr-4'></span>Create a License</div>}>
            <div className="p-4">
              <CreateLicenseForm
                teamNames={userTeamNames}
                projectNames={teamProjectNames}
                licenseTeam={licenseTeam}
                licenseProject={licenseProject}
                licenseName={licenseName}
                setImage={setLicenseImage}
                setTeam={setLicenseTeam}
                setProject={setLicenseProject}
                setName={setLicenseName}
                setDescription={setLicenseDescription}
                setPrice={setLicensePrice}
                submit={createLicense}
                setView={setView}
              />
            </div>
          </Accordion>}
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 lg:col-span-7 gap-4">
          {renderPreview(view)}
        </div>
      </div>
    </Layout>
  );
};

export default CreatePage;
