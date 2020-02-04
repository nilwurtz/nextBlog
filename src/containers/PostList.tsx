import matter from 'gray-matter';
import React from 'react';
import styled from 'styled-components';

import { PostCard } from '../components/Post/PostCard';

type Props = {
  posts: {
    fileName: string;
    md: matter.GrayMatterFile<any>;
  }[];
  style?: React.CSSProperties;
};

export const PostList: React.FC<Props> = props => {
  return (
    <Root style={props.style}>
      {props.posts.map((item, key) => (
        <PostCard key={key} fileName={item.fileName} md={item.md} />
      ))}
    </Root>
  );
};

const Root = styled.div`
  & > div {
    margin: 2em 0;
  }
`;
