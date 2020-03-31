import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/react-hooks';

import { Footer } from '../../components/common/Footer';
import { PostList } from '../../containers/PostList';
import { GET_POSTS } from '../../query/queries/getPosts';
import { GetPosts } from '../../types/api';

export const PostListPage: NextPage = () => {
  const { loading, error, data, fetchMore } = useQuery<GetPosts>(GET_POSTS);
  if (loading) return <div>{"Loading..."}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  return (
    <>
      <Head>
        <title key="title">記事一覧 - Ragnar Blog</title>
      </Head>
      <Title>記事一覧</Title>

      {data && data.allPosts && data.allPosts.edges ? (
        <Root>
          <PostList edges={data.allPosts.edges} style={{ gridColumn: "2/3" }} />
        </Root>
      ) : null}
      {data.allPosts.pageInfo.hasNextPage ? (
        <button
          onClick={() => {
            fetchMore({
              variables: {
                after: data.allPosts.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newPageInfo = fetchMoreResult.allPosts.pageInfo;
                const newEdges = fetchMoreResult.allPosts.edges;
                return newEdges.length
                  ? {
                      allPosts: {
                        __typename: previousResult.allPosts.__typename,
                        edges: [...previousResult.allPosts.edges, ...newEdges],
                        pageInfo: newPageInfo,
                      },
                    }
                  : previousResult;
              },
            });
          }}>
          CLICK HERE
        </button>
      ) : (
        <div>{"ok"}</div>
      )}
      <Footer />
    </>
  );
};

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  margin: 2em;
`;

const Root = styled.div`
  display: grid;
  grid-template-columns: 5vw calc(100vw - 10vw) 5vw;
  /* desktop */
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 800px 1fr;
  }
`;

export default PostListPage;
