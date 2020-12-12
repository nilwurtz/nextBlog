import { Footer } from 'components/atoms/common/Footer';
import { ListPageTitle } from 'components/molecules/ListPageTitle';
import { Breadcrumb } from 'components/organisms/Breadcrumb';
import { PostList } from 'components/organisms/PostList';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { Article, MicroCMSListResponse } from 'types/api';

const paths = [
  { href: "/", label: "Home" },
  { href: "/post", label: "Posts" },
];

export const PostsPage: React.FC<Pick<MicroCMSListResponse<Article>, "contents">> = props => {
  return (
    <>
      <Head>
        <title key="title">記事一覧 - Ragnar Blog</title>
      </Head>
      <ListPageTitle>記事一覧</ListPageTitle>
      <Root>
        <div className="content">
          <Breadcrumb paths={paths} />
          <PostList contents={props.contents} />
        </div>
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
  > div.content {
    grid-column: 2/3;
  }
`;
