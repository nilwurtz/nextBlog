import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { isArray } from 'util';

import { useQuery } from '@apollo/react-hooks';

import { Fetching } from '../../components/common/Fetching';
import { Footer } from '../../components/common/Footer';
import { MarkDownViewer } from '../../components/Post/MarkDownViewer';
import { TitleHeader } from '../../components/Post/TitleHeader';
import { SocialButtons } from '../../components/social/ShareButtons';
import { GET_POST } from '../../query/queries/getPost';
import { GetPost } from '../../types/api';
import { dateFormat } from '../../utils/date';

const PostDetailPage: NextPage = () => {
  const router = useRouter();
  const rawId = isArray(router.query.postId) ? router.query.postId.join("") : router.query.postId;
  const { loading, error, data } = useQuery<GetPost>(GET_POST, {
    variables: {
      rawId: parseInt(rawId),
    },
  });
  if (loading) return <Fetching />;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  return (
    <React.Fragment>
      <Head>
        <title key="title">{data.post.title} - Ragnar Blog</title>
        <meta name="keywords" content={data.post.tags.map(item => item.name).join(",")}></meta>
      </Head>
      <TitleHeader title={data.post.title} date={dateFormat(data.post.createdAt)} />
      <Root>
        <ContentArea>{data && data.post && data.post.body ? <MarkDownViewer md={data.post.body} /> : null}</ContentArea>
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

export default PostDetailPage;
