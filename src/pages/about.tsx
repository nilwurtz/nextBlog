import { NextPage } from 'next';
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
    <Root>
      <MainArea>
        <BaseCard style={cardStyle}>
          <h1>About Me</h1>
        </BaseCard>
        <h2>Ragnar</h2>
        <p>社会人一年目。業務ではPythonをもっぱら触ってます。最近はReact + Typescriptに夢中。</p>
        <SocialLinks />
        <BaseCard style={cardStyle}>
          <h1>About This Site</h1>
        </BaseCard>
        <p>Made by Next.js + Typescript + styled-components</p>
        <p>
          <a href={SocialUrls.siteGitRepo}>view in github</a>
        </p>
      </MainArea>
    </Root>
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
    margin-left: 1rem;
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

export default About;
