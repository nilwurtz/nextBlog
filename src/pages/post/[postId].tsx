import axios from 'axios';
import { PostPage } from 'components/templates/PostPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import React from 'react';

import { Article, MicroCMSListResponse } from '../../types/api';

const PostDetailPage: NextPage<Article> = props => {
  return <PostPage {...props} />;
};

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
