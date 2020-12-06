import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Footer } from '../../components/common/Footer';
import { Breadcrumb } from '../../components/organisms/Breadcrumb';
import { SocialButtons } from '../../components/social/ShareButtons';
import { Article, MicroCMSListResponse } from '../../types/api';

const PostDetailPage: NextPage<Article> = props => {
  const router = useRouter();
  const slug = router.query["postId"];
  const postId = Array.isArray(slug) ? slug.join("") : slug;

  const paths = [
    { href: "/", label: "Home" },
    { href: "/post", label: "Posts" },
    { href: "/category/[categoryId]", as: `/category/${props.category.id}`, label: props.category.name },
    { href: "/post/[postId]", as: `/post/${postId}`, label: props.title },
  ];

  return (
    <>
      <Head>
        <title key="title">{props.title} - Ragnar Blog</title>
        <meta name="keywords" content={props.tags.map(item => item.name).join(",")}></meta>
      </Head>
      <Root>
        <ContentArea>
          <Breadcrumb paths={paths} />
        </ContentArea>
        <SideArea>
          <div>
            <SocialButtons vertical={true} />
          </div>
        </SideArea>
      </Root>
      <Footer />
    </>
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
  & > div {
    margin-bottom: 1em;
  }
  /* desktop */
  @media screen and (min-width: 800px) {
    font-size: 1.5rem;
    & > div {
      margin-bottom: 2em;
    }
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

export const getStaticPaths: GetStaticPaths = async () => {
  const url = process.env.BLOG_BACKEND_URL + "api/v1/articles";
  const res = await axios.get<MicroCMSListResponse<Article>>(url, {
    headers: { "X-API-KEY": process.env.BLOG_BACKEND_KEY },
  });
  const paths = res.data.contents.map(i => {
    return { params: { postId: i.id } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Article> = async (ctx: GetStaticPropsContext<{ postId: string }>) => {
  const url = process.env.BLOG_BACKEND_URL + "api/v1/articles/" + ctx.params.postId;
  const res = await axios.get<Article>(url, {
    headers: { "X-API-KEY": process.env.BLOG_BACKEND_KEY },
  });
  return {
    props: res.data,
  };
};

export default PostDetailPage;
