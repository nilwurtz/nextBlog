import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { IndexHeader } from '../containers/IndexHeader';

const Index: NextPage = () => (
  <>
    <Head>
      <title key="title">Ragnar Blog</title>
    </Head>

    <IndexHeader />
    <SampleContent />
  </>
);

export default Index;

const SampleContent = styled.div`
  height: 150vh;
  background: gray;
`;
