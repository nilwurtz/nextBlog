import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { Footer } from '../../components/common/Footer';
import { MarkDownViewer } from '../../components/Post/MarkDownViewer';
import { TitleHeader } from '../../components/Post/TitleHeader';
import { SocialButtons } from '../../components/social/ShareButtons';
import { dateFormat } from '../../utils/date';

type Props = {
  md?: matter.GrayMatterFile<any>;
};

const PostDetailPage: NextPage<Props> = props => {
  const meta = props.md.data;
  const formattedDate = meta.date ? dateFormat(meta.date) : "2000-01-01";
  return (
    <React.Fragment>
      <Head>
        <title key="title">{meta.title} - Ragnar Blog</title>
        <meta name="keywords" content={meta.tags.split(" ").join(",")}></meta>
      </Head>
      <TitleHeader title={meta.title} date={formattedDate} />
      <Root>
        <ContentArea>
          <MarkDownViewer md={props.md.content} />
        </ContentArea>
        <SideArea>
          <div>
            <SocialButtons vertical={true} />
          </div>
        </SideArea>
      </Root>
      <Footer />
    </React.Fragment>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 5vw calc(100vw - 10vw) 5vw;
  margin-bottom: 10vh;
  /* desktop lg */
  @media screen and (min-width: 1200px) {
    /* 10vw : 1 : 0.381 : 10vw */
    grid-template-columns: 10vw calc((100vw - 20vw) * 0.724) auto 10vw;
  }
  /* desktop */
  @media screen and (min-width: 800px) and (max-width: 1200px) {
    grid-template-columns: 10vw calc((100vw - 20vw) * 0.85) auto 10vw;
  }
`;

const ContentArea = styled.div`
  grid-column: 2/3;
  font-size: 1.3rem;
  /* desktop */
  @media screen and (min-width: 800px) {
    font-size: 1.5rem;
  }
`;

const SideArea = styled.div`
  display: none;
  @media screen and (min-width: 800px) {
    display: block;
    grid-column: 3/4;
    font-size: 1.3rem;
  }
  & div {
    position: sticky;
    top: 100px;
  }
`;

export const getStaticPaths: GetStaticPaths = async function() {
  // get all .md files from the src/posts dir
  const contexts = require.context("../../md", true, /\.md$/);
  const allPosts = contexts.keys().map(path => {
    // 拡張子を省いたファイル名
    const fileName = path.match(/([^/]*)(?:\.([^.]+$))/)[1];
    return { params: fileName };
  });

  return {
    paths: allPosts.map(post => `/post/${post.params}`) || [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { postId } = context.params;
  const contexts = require.context("../../md", true, /\.md$/);
  const content = contexts.keys().filter(path => {
    const fileName = path.match(/([^/]*)(?:\.([^.]+$))/)[1];
    return fileName === postId;
  });
  const matterData = matter(contexts(content[0]).default);
  delete matterData.orig;
  if (matterData.data.date) {
    matterData.data.date = new Date(matterData.data.date).toISOString();
  }
  return { props: { md: matterData } };
};

export default PostDetailPage;
