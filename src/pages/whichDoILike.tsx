import { readFileSync } from 'fs';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { ScrollReveal } from '../components/common/ScrollReveal';
import { CatOrDog } from '../components/which/CatOrDog';
import { Container } from '../components/which/Container';
import { WhichPython } from '../components/which/WhichPython';

type Props = {
  likePyCode: string;
  dislikePyCode: string;
};

const Which: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title key="title">Which Do I Like? - Ragnar Blog</title>
      </Head>
      <Root>
        <Container>
          <h1>Which Do I like?</h1>
          <p>Hover or touch</p>
        </Container>
        <ScrollReveal revealHeight={500}>
          <CatOrDog />
        </ScrollReveal>

        <ScrollReveal revealHeight={500}>
          <WhichPython likePyCode={props.likePyCode} dislikePyCode={props.dislikePyCode} />
        </ScrollReveal>

        <SampleDiv />
      </Root>
    </>
  );
};

const Root = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const SampleDiv = styled.div`
  height: 50vh;
  width: 80vw;
`;

Which.getInitialProps = async () => {
  const likePyCode = readFileSync("src/codes/like.py").toString();
  const dislikePyCode = readFileSync("src/codes/dislike.py").toString();
  return {
    likePyCode,
    dislikePyCode,
  };
};

export default Which;
