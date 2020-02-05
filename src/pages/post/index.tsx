import matter from 'gray-matter';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { Footer } from '../../components/common/Footer';
import { PostList } from '../../containers/PostList';

type Props = {
  posts: {
    fileName: string;
    md: matter.GrayMatterFile<any>;
  }[];
};

export const PostListPage: NextPage<Props> = props => {
  const posts = props.posts;
  return (
    <>
      <Root>
        <PostList posts={posts} style={{ gridColumn: "2/3" }} />
      </Root>
      <Footer />
    </>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 5vw calc(100vw - 10vw) 5vw;
  /* desktop */
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 800px 1fr;
  }
`;

PostListPage.getInitialProps = async function() {
  // get all .md files from the src/posts dir
  const contexts = require.context("../../md", true, /\.md$/);
  const posts = contexts.keys().map(path => {
    // 拡張子を省いたファイル名
    const fileName = path.match(/([^/]*)(?:\.([^.]+$))/)[1];
    const mdData = matter(contexts(path).default);
    return {
      fileName: fileName,
      md: mdData,
    };
  });
  // postを日付でソート
  posts.sort((a, b) => {
    if (a.md.data.date > b.md.data.date) return -1;
    if (a.md.data.date < b.md.data.date) return 1;
    return 0;
  });

  return {
    posts: posts,
  };
};

export default PostListPage;
