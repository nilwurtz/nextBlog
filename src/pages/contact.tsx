import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title key="title">Contact - Ragnar Blog</title>
      </Head>
      <Root>
        <p>工事中...</p>
        <p>Twitter: @ragnar1904 まで。</p>
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
`;

export default Contact;
