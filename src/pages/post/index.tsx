import axios from 'axios';
import { PostsPage } from 'components/templates/PostsPage';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { Article, MicroCMSListResponse } from 'types/api';

export const PostListPage: NextPage<Pick<MicroCMSListResponse<Article>, "contents">> = props => {
  return <PostsPage {...props} />;
};

export const getStaticProps: GetStaticProps<Pick<MicroCMSListResponse<Article>, "contents">> = async () => {
  const url = process.env.BLOG_BACKEND_URL + "api/v1/articles";
  const res = await axios.get<MicroCMSListResponse<Article>>(url, {
    headers: { "X-API-KEY": process.env.BLOG_BACKEND_KEY },
  });
  const props = await res.data;
  return {
    props: { contents: props.contents },
  };
};

export default PostListPage;
