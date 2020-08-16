import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { BaseCard } from '../components/common/BaseCard';
import color from '../config/color';
import { SocialUrls } from '../config/social';
import { SocialLinks } from '../containers/SocialLinks';

const About: NextPage = () => {
  const cardStyle: React.CSSProperties = {
    border: "0",
    borderBottom: `1.5px solid ${color.primary.dark}`,
    padding: "1em 1em 1em 25px",
  };
  return (
    <>
      <Head>
        <title key="title">About - Ragnar Blog</title>
      </Head>
      <Root>
        <MainArea>
          <BaseCard clickable={false} style={cardStyle}>
            <h1>About Me</h1>
          </BaseCard>
          <h2>Ragnar</h2>
          <ProfileIcon>
            <img src="/profile_icon.png" alt="profile icon" width="300px" height="300px" />
          </ProfileIcon>
          <p>社会人2年目。転職しました。SaaSの開発やってます。</p>
          <SocialLinks />
          <BaseCard clickable={false} style={cardStyle}>
            <h1>About This Site</h1>
          </BaseCard>
          <p>Made by Next.js + Typescript + styled-components + Apollo</p>
          <p>
            <a href={SocialUrls.siteGitRepo}>view in github</a>
          </p>
        </MainArea>
      </Root>
    </>
  );
};

const Root = styled.div`
  width: 100vw;
  height: calc(100vh - 6rem);
  background-color: white;
  display: grid;
  grid-template-columns: 5vw calc(100vw - 10vw) 5vw;
  /* desktop */
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 800px 1fr;
  }
`;

const MainArea = styled.div`
  grid-column: 2/3;
  & > div {
    margin: 2rem 0;
  }
  & h2,
  p {
    margin-left: 1.4rem;
  }
  & h1 {
    font-size: 2rem;
  }
  & p {
    font-size: 1.3rem;
  }
  /* desktop */
  @media screen and (min-width: 800px) {
    & h1 {
      font-size: 3rem;
    }
    & h2 {
      font-size: 2.5rem;
    }
    & p {
      font-size: 1.7rem;
    }
  }
`;

const ProfileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default About;
