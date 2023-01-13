import { Flex, Grid, Modal, Text } from '@mantine/core';
import { Metadata } from '../Metadata';
import Image from 'next/image';
import { Button } from '@valist/ui';
import { useRouter } from 'next/router';

export interface WrappedModalProps {
  address: string;
  projects: any[];
  releases: any[];
  logs: any[];
  loading?: boolean;
  opened: boolean;
  onClose: () => void;
}

export function WrappedModal(props: WrappedModalProps) {
  console.log('projects', props.projects);
  const router = useRouter();

  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      padding={0}
      size={900}
      centered
      withCloseButton={false}
      style={{ backgroundColor: '#ffffff' }}
    >
      <Grid>
        <Grid.Col md={6} p={40}>
          <Text size={24} weight={700} mb={8}>Your 2022 with Valist</Text>
          <Text size={14} weight={400} mb={32} color="#9595A8">You have been amazing this 2022 and we love you. Cant wait to see what awesome projects you create in 2023  🎉</Text>

          <Text size={14} color="#9595A8">Share</Text>
          <Flex
            gap={8}
          >
            <div style={{ padding: 8 }}>
              <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.26428 15.2221V8.34044H7.58588L7.93097 5.64604H5.26428V3.92982C5.26428 3.15232 5.48091 2.61999 6.59679 2.61999H8.01074V0.217784C7.32277 0.144056 6.63125 0.108457 5.93935 0.11115C3.88727 0.11115 2.47836 1.36389 2.47836 3.66366V5.64101H0.171875V8.33541H2.4834V15.2221H5.26428Z" fill="#9B9BB1"/>
              </svg>
            </div>
            
            <div style={{ padding: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.272 2.768C12.0821 2.768 11.8965 2.8243 11.7387 2.92979C11.5808 3.03528 11.4577 3.18521 11.3851 3.36062C11.3124 3.53604 11.2934 3.72906 11.3304 3.91529C11.3675 4.10151 11.4589 4.27256 11.5932 4.40682C11.7274 4.54108 11.8985 4.63251 12.0847 4.66955C12.2709 4.7066 12.464 4.68758 12.6394 4.61492C12.8148 4.54226 12.9647 4.41922 13.0702 4.26135C13.1757 4.10348 13.232 3.91787 13.232 3.728C13.232 3.47339 13.1309 3.22921 12.9508 3.04918C12.7708 2.86914 12.5266 2.768 12.272 2.768ZM15.952 4.704C15.9364 4.04024 15.8121 3.38352 15.584 2.76C15.3806 2.22651 15.064 1.74342 14.656 1.344C14.2599 0.933941 13.7756 0.619341 13.24 0.424C12.6181 0.188929 11.9607 0.061768 11.296 0.048C10.448 -4.47035e-08 10.176 0 8 0C5.824 0 5.552 -4.47035e-08 4.704 0.048C4.03932 0.061768 3.38187 0.188929 2.76 0.424C2.22534 0.621319 1.74155 0.935648 1.344 1.344C0.933941 1.74014 0.619341 2.22435 0.424 2.76C0.188929 3.38187 0.061768 4.03932 0.048 4.704C-4.47035e-08 5.552 0 5.824 0 8C0 10.176 -4.47035e-08 10.448 0.048 11.296C0.061768 11.9607 0.188929 12.6181 0.424 13.24C0.619341 13.7756 0.933941 14.2599 1.344 14.656C1.74155 15.0644 2.22534 15.3787 2.76 15.576C3.38187 15.8111 4.03932 15.9382 4.704 15.952C5.552 16 5.824 16 8 16C10.176 16 10.448 16 11.296 15.952C11.9607 15.9382 12.6181 15.8111 13.24 15.576C13.7756 15.3807 14.2599 15.0661 14.656 14.656C15.0658 14.2581 15.3827 13.7746 15.584 13.24C15.8121 12.6165 15.9364 11.9598 15.952 11.296C15.952 10.448 16 10.176 16 8C16 5.824 16 5.552 15.952 4.704ZM14.512 11.2C14.5062 11.7078 14.4142 12.211 14.24 12.688C14.1123 13.0362 13.9071 13.3507 13.64 13.608C13.3805 13.8724 13.0666 14.0771 12.72 14.208C12.243 14.3822 11.7398 14.4742 11.232 14.48C10.432 14.52 10.136 14.528 8.032 14.528C5.928 14.528 5.632 14.528 4.832 14.48C4.30471 14.4899 3.77968 14.4087 3.28 14.24C2.94863 14.1025 2.64908 13.8982 2.4 13.64C2.13447 13.383 1.93187 13.0682 1.808 12.72C1.61269 12.2361 1.50435 11.7216 1.488 11.2C1.488 10.4 1.44 10.104 1.44 8C1.44 5.896 1.44 5.6 1.488 4.8C1.49159 4.28084 1.58636 3.76636 1.768 3.28C1.90884 2.94233 2.12501 2.64133 2.4 2.4C2.64305 2.12493 2.94343 1.90648 3.28 1.76C3.76764 1.58403 4.2816 1.49206 4.8 1.488C5.6 1.488 5.896 1.44 8 1.44C10.104 1.44 10.4 1.44 11.2 1.488C11.7078 1.49382 12.211 1.5858 12.688 1.76C13.0515 1.89492 13.3778 2.11428 13.64 2.4C13.9022 2.64574 14.107 2.94619 14.24 3.28C14.4178 3.76715 14.5098 4.28142 14.512 4.8C14.552 5.6 14.56 5.896 14.56 8C14.56 10.104 14.552 10.4 14.512 11.2ZM8 3.896C7.18865 3.89758 6.39597 4.13962 5.72212 4.59153C5.04828 5.04345 4.5235 5.68496 4.21411 6.435C3.90471 7.18505 3.82458 8.00997 3.98384 8.80554C4.14309 9.60111 4.53459 10.3316 5.10886 10.9048C5.68313 11.4779 6.41441 11.868 7.21029 12.0257C8.00617 12.1834 8.83093 12.1017 9.58037 11.7908C10.3298 11.48 10.9703 10.954 11.4209 10.2792C11.8715 9.6045 12.112 8.81135 12.112 8C12.1131 7.46008 12.0074 6.92529 11.801 6.42636C11.5946 5.92744 11.2916 5.47425 10.9095 5.09284C10.5273 4.71143 10.0736 4.40934 9.57424 4.20394C9.07492 3.99854 8.53991 3.89389 8 3.896ZM8 10.664C7.47311 10.664 6.95805 10.5078 6.51996 10.215C6.08187 9.92231 5.74042 9.50625 5.53878 9.01947C5.33715 8.53269 5.2844 7.99705 5.38719 7.48028C5.48998 6.96351 5.7437 6.48883 6.11627 6.11627C6.48883 5.7437 6.96351 5.48998 7.48028 5.38719C7.99705 5.2844 8.53269 5.33715 9.01947 5.53878C9.50625 5.74042 9.92231 6.08187 10.215 6.51996C10.5078 6.95805 10.664 7.47311 10.664 8C10.664 8.34984 10.5951 8.69626 10.4612 9.01947C10.3273 9.34268 10.1311 9.63636 9.88373 9.88373C9.63636 10.1311 9.34268 10.3273 9.01947 10.4612C8.69626 10.5951 8.34984 10.664 8 10.664Z" fill="#9B9BB1"/>
              </svg>
            </div>
            
            <div style={{ padding: 8 }}>
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9951 0.951413C15.9952 0.822994 15.9613 0.696845 15.8967 0.585815C15.8322 0.474785 15.7394 0.38284 15.6278 0.319344C15.5161 0.255847 15.3897 0.223068 15.2613 0.224343C15.1329 0.225619 15.0071 0.260904 14.8967 0.326606C14.4712 0.579898 14.013 0.773873 13.535 0.903152C12.8523 0.317323 11.9815 -0.00325153 11.0819 2.48681e-05C10.095 0.00116097 9.14719 0.385789 8.43857 1.07269C7.72994 1.7596 7.31599 2.695 7.28413 3.6814C5.33855 3.37114 3.57521 2.35565 2.33038 0.828579C2.25538 0.737579 2.15959 0.66595 2.0511 0.619733C1.9426 0.573516 1.82459 0.554067 1.707 0.563026C1.58948 0.572703 1.47609 0.61086 1.37662 0.674199C1.27716 0.737538 1.19463 0.824151 1.13615 0.926548C0.836267 1.44988 0.664033 2.03657 0.633438 2.63896C0.602844 3.24135 0.71475 3.84247 0.960071 4.3935L0.958653 4.39491C0.848394 4.46282 0.757401 4.55788 0.694376 4.67101C0.631351 4.78413 0.598402 4.91153 0.598679 5.04102C0.597344 5.14785 0.603751 5.25463 0.617851 5.36052C0.692109 6.27534 1.09754 7.13164 1.75812 7.76886C1.71331 7.85423 1.68596 7.94768 1.67766 8.04374C1.66937 8.1398 1.68031 8.23655 1.70984 8.32834C1.99783 9.22562 2.61028 9.98314 3.42734 10.4527C2.59723 10.7737 1.70091 10.8856 0.817359 10.7786C0.653827 10.758 0.488175 10.7937 0.347578 10.8797C0.206981 10.9657 0.099786 11.0969 0.043577 11.2519C-0.0126319 11.4068 -0.0145172 11.5763 0.0382303 11.7324C0.0909777 11.8885 0.195226 12.0221 0.333875 12.1112C1.85347 13.09 3.62279 13.6103 5.43029 13.6101C7.48001 13.6331 9.4799 12.9781 11.1189 11.747C12.7578 10.5158 13.9439 8.77754 14.4927 6.80252C14.7494 5.94216 14.8805 5.04923 14.8819 4.1514C14.8819 4.10383 14.8819 4.05484 14.8811 4.00585C15.2607 3.59647 15.5548 3.11544 15.7461 2.59095C15.9374 2.06645 16.022 1.50905 15.9951 0.951413ZM13.591 3.28661C13.471 3.42864 13.4102 3.61146 13.4214 3.79711C13.4285 3.91707 13.4277 4.03776 13.4277 4.1514C13.4263 4.9101 13.3151 5.66459 13.0976 6.39146C12.6494 8.07195 11.6502 9.5534 10.26 10.5986C8.86984 11.6437 7.16915 12.1922 5.43029 12.156C4.80567 12.1562 4.1832 12.0828 3.57576 11.9373C4.35036 11.6877 5.07462 11.3028 5.715 10.8006C5.83294 10.7077 5.91926 10.5806 5.96211 10.4368C6.00496 10.2929 6.00224 10.1393 5.95432 9.99702C5.90641 9.85476 5.81564 9.7308 5.69448 9.64217C5.57332 9.55354 5.4277 9.50458 5.27761 9.50199C4.67331 9.4926 4.09626 9.24899 3.66803 8.82252C3.77666 8.80193 3.88458 8.77637 3.99179 8.74584C4.14884 8.70113 4.28628 8.60488 4.38197 8.47257C4.47766 8.34026 4.52604 8.17959 4.51932 8.01644C4.51259 7.8533 4.45116 7.69716 4.34491 7.57317C4.23866 7.44918 4.09377 7.36456 3.93357 7.33293C3.5828 7.26365 3.25273 7.11442 2.96901 6.89683C2.6853 6.67924 2.45558 6.39916 2.29772 6.07835C2.42912 6.09628 2.56136 6.10742 2.6939 6.11172C2.85137 6.1141 3.00551 6.06633 3.13404 5.97533C3.26257 5.88432 3.35882 5.7548 3.40888 5.60548C3.45685 5.45481 3.45438 5.29261 3.40185 5.14347C3.34932 4.99433 3.24959 4.86639 3.11778 4.77904C2.79799 4.56599 2.53603 4.27696 2.35537 3.93782C2.17471 3.59868 2.08098 3.22002 2.08259 2.83577C2.08259 2.78749 2.08401 2.73921 2.08685 2.69164C3.71635 4.21134 5.82991 5.1072 8.05516 5.22138C8.16748 5.22581 8.27934 5.20465 8.38229 5.15951C8.48524 5.11437 8.57659 5.04642 8.64944 4.96081C8.72154 4.87436 8.7726 4.77236 8.79859 4.66284C8.82458 4.55331 8.82479 4.43924 8.79921 4.32962C8.75763 4.15612 8.73642 3.97836 8.73602 3.79995C8.73668 3.17799 8.98405 2.58169 9.42384 2.1419C9.86363 1.70211 10.4599 1.45475 11.0819 1.45409C11.4019 1.45323 11.7186 1.51872 12.012 1.64643C12.3054 1.77413 12.5692 1.96128 12.7866 2.19605C12.8705 2.28626 12.976 2.35352 13.0932 2.39143C13.2104 2.42934 13.3353 2.43664 13.4561 2.41263C13.7548 2.3545 14.0492 2.27623 14.3372 2.17833C14.1407 2.58036 13.8896 2.95332 13.591 3.28661Z" fill="#9B9BB1"/>
              </svg>
            </div>

            <div style={{ padding: 8 }}>
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4 5.552C14.3917 5.47851 14.3756 5.4061 14.352 5.336V5.264C14.3135 5.18174 14.2622 5.10613 14.2 5.04L9.4 0.24C9.33387 0.177773 9.25826 0.126465 9.176 0.0879999C9.15212 0.0846081 9.12788 0.0846081 9.104 0.0879999C9.02273 0.041393 8.93298 0.0114754 8.84 0H5.6C4.96348 0 4.35303 0.252856 3.90294 0.702944C3.45286 1.15303 3.2 1.76348 3.2 2.4V3.2H2.4C1.76348 3.2 1.15303 3.45286 0.702944 3.90294C0.252856 4.35303 0 4.96348 0 5.6V13.6C0 14.2365 0.252856 14.847 0.702944 15.2971C1.15303 15.7471 1.76348 16 2.4 16H8.8C9.43652 16 10.047 15.7471 10.4971 15.2971C10.9471 14.847 11.2 14.2365 11.2 13.6V12.8H12C12.6365 12.8 13.247 12.5471 13.6971 12.0971C14.1471 11.647 14.4 11.0365 14.4 10.4V5.6C14.4 5.6 14.4 5.6 14.4 5.552ZM9.6 2.728L11.672 4.8H10.4C10.1878 4.8 9.98434 4.71571 9.83432 4.56569C9.68429 4.41566 9.6 4.21217 9.6 4V2.728ZM9.6 13.6C9.6 13.8122 9.51571 14.0157 9.36569 14.1657C9.21566 14.3157 9.01217 14.4 8.8 14.4H2.4C2.18783 14.4 1.98434 14.3157 1.83431 14.1657C1.68429 14.0157 1.6 13.8122 1.6 13.6V5.6C1.6 5.38783 1.68429 5.18434 1.83431 5.03431C1.98434 4.88429 2.18783 4.8 2.4 4.8H3.2V10.4C3.2 11.0365 3.45286 11.647 3.90294 12.0971C4.35303 12.5471 4.96348 12.8 5.6 12.8H9.6V13.6ZM12.8 10.4C12.8 10.6122 12.7157 10.8157 12.5657 10.9657C12.4157 11.1157 12.2122 11.2 12 11.2H5.6C5.38783 11.2 5.18434 11.1157 5.03431 10.9657C4.88429 10.8157 4.8 10.6122 4.8 10.4V2.4C4.8 2.18783 4.88429 1.98434 5.03431 1.83431C5.18434 1.68429 5.38783 1.6 5.6 1.6H8V4C8 4.63652 8.25286 5.24697 8.70294 5.69706C9.15303 6.14714 9.76348 6.4 10.4 6.4H12.8V10.4Z" fill="#9B9BB1"/>
              </svg>
            </div>
          </Flex>

          <Button onClick={() => router.push(`/-/wrapped/${props.address}`)} style={{ marginTop: 112 }}>Link to Wrapped PAge</Button>
          <Button onClick={() => window.open("https://twitter.com/intent/tweet?text=IPFS%20image%20preview%20test.%20https://gateway.pinata.cloud/ipfs/QmWdsa9gxE4cmrWQZPLLBuqCk4ecwKYSNXxPurxDAKgCBX")}>Tweet Image</Button>
        </Grid.Col>
        <Grid.Col md={6} py={40} px={32} style={{ background: 'linear-gradient(270deg, #8680F8 0.01%, #4152CF 100%)' }}>
          <Flex
            align="center"
            px={15}
            py={10}
            style={{ backgroundColor: '#fae8cf', borderRadius: 8 }}
            mb={19}
            gap={16}
          >
            <Text id="test" size={90} color={'#F79009'} style={{ lineHeight: 1 }}>
              {props.projects.length}
            </Text>
            <div>
              <Text style={{ fontSize: 12,color: '#9B9BB1' }}>
                Total Projects
              </Text>
              <Text style={{ fontSize: 24 }}>
                Published
              </Text>
            </div>
          </Flex>

          <Flex      
            direction="row"
            wrap="wrap"
            gap="md"
            style={{ fontSize: 12, border: '0.5px solid #FFFFFF', borderRadius: 8, color: "#FFFFFF" }}
            p={16}
            mb={24}
          >
            <div>
              Total Releases: {props.releases.length}
            </div>
            <div>
              No. of on-chain transactions: {props.logs.length}
            </div>
            <div>
              Software Licenses created: {24}
            </div>
            <div>
              Valist Ranking: {5}
            </div>
          </Flex>
          
          <div>
            <Text size={12} weight={400} mb={8} color="#CBC9F9">Your First Project</Text>
            {props.projects.length != 0 && 
              <Metadata url={props.projects[0].metaURI}>
                {(data: any) => ( 
                  <Flex
                    gap={16}
                  >
                    <Image height={100} width={130} alt="project-img" src={data?.image} />
                    <div>
                      <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 700 }}>
                        {data?.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 400, marginBottom: 16 }}>
                        {data?.short_description}
                      </div>
                      <div style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 400 }}>
                        <div style={{ fontWeight: 700 }}>Last Edit: </div>
                      </div>
                    </div>
                  </Flex>
                )}
              </Metadata>
            }
          </div>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}