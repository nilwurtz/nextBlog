import React from 'react';
import styled from 'styled-components';
import { Article } from 'types/api';

import { PostCard } from '../molecules/PostCard';

type Props = {
  contents: Article[];
};

const PostListBase: React.FCX<Props> = props => {
  return (
    <div className={props.className}>
      {props.contents.map(i => (
        <PostCard key={i.id} {...i} />
      ))}
    </div>
  );
};

export const PostList = styled(PostListBase)`
  & > div {
    margin: 2em 0;
  }
  & > div:last-child {
    margin: 2em 0 0 0;
  }
`;
