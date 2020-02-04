import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { BaseCard } from '../components/common/BaseCard';
import color from '../config/color';
import { SocialLinks } from '../containers/SocialLinks';

const About: NextPage = () => {
  return (
    <Root>
      <MainArea>
        <BaseCard>
          <h1>Ragnar</h1>
          <p>社会人一年目。業務ではPythonをもっぱら触ってます。最近はReact + Typescriptに夢中。</p>
        </BaseCard>
        <SocialLinks />
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
`;

const MainArea = styled.div`
  grid-column: 2/3;
  & > div {
    margin: 2rem 0;
  }
  & h1 {
    font-size: 2rem;
  }
  & p {
    font-size: 1.3rem;
  }
`;
export default About;
