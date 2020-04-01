import React from 'react';
import styled from 'styled-components';

import { PostCard } from '../components/Post/PostCard';
// eslint-disable-next-line @typescript-eslint/camelcase
import { GetPosts_allPosts } from '../types/api';

type Props = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  edges: GetPosts_allPosts["edges"];
  style?: React.CSSProperties;
};

export const PostList: React.FC<Props> = props => {
  return (
    <Root style={props.style}>
      {props.edges.map(item => (
        <PostCard key={item.node.id} node={item.node} />
      ))}
    </Root>
  );
};

const Root = styled.div`
  & > div {
    margin: 2em 0;
  }
  & div:last-child {
    margin: 2em 0 0 0;
  }
`;
