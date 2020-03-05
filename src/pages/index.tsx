import fs from 'fs';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Footer } from '../components/common/Footer';
import { LiveCode } from '../components/common/LiveCode';
import color from '../config/color';
import { IndexHeader } from '../containers/IndexHeader';

type CodeProps = {
  code: string;
  language: string;
};

type InitialProps = {
  profile: CodeProps;
  site: CodeProps;
};

const Index: NextPage<InitialProps> = props => {
  return (
    <>
      <Head>
        <title key="title">Ragnar Blog</title>
      </Head>
      <IndexHeader />

      <ProfileWrap>
        <Profile>
          <TextBox>
            <h1>私について</h1>
            <p>社会人1年目のソフトウェアエンジニア。</p>
            <p>音楽とネコとものづくりが好き。</p>
            <p>興味があることにはすぐ手を出しがち。</p>
            <Link href="/about">
              <a>About Page</a>
            </Link>
          </TextBox>
          <LiveCode code={props.profile.code} language={props.profile.language} />
        </Profile>
      </ProfileWrap>

      <ProfileWrap>
        <Profile>
          <TextBox>
            <h1>このサイトについて</h1>
            <p>Reactの思想、設計に惚れ、</p>
            <p>Typescriptに感動した結果、</p>
            <p>いつのまにかこんなサイトを作っていた。</p>
            <p>主に自分の詰まった部分の記事を上げていく。</p>
            <Link href="/post">
              <a>Posts Page</a>
            </Link>
          </TextBox>
          <LiveCode code={props.site.code} language={props.site.language} />
        </Profile>
      </ProfileWrap>
      <Footer />
    </>
  );
};

export default Index;

Index.getInitialProps = async () => {
  const profile = fs.readFileSync("./src/codes/profileCode.py");
  const site = fs.readFileSync("./src/codes/thisSite.ts");
  return {
    profile: { code: profile.toString(), language: "python" },
    site: { code: site.toString(), language: "typescript" },
  };
};

const ProfileWrap = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  display: grid;
  grid-template-rows: 1fr 1.2fr;
  height: 100%;
  width: 100%;

  /* desktop */
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
    height: 490px;
  }
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  & a {
    color: ${color.secondary};
    text-decoration: none;
    cursor: pointer;
    font-size: 2rem;
    padding-left: 1em;
    &::before {
      content: "→ ";
    }
  }
  & h1 {
    font-size: 3rem;
    padding-left: 0.7em;
    margin-bottom: 0.7em;
  }
  & p {
    font-size: 1.8rem;
    padding-left: 1em;
  }

  /* desktop */
  @media screen and (min-width: 800px) {
    & > * {
      margin-left: 10vw;
    }
  }
`;
