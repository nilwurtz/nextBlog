import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/camelcase
import { GetPosts_allPosts_edges_node } from '../../types/api';
import { dateFormat } from '../../utils/date';
import { BaseCard } from '../common/BaseCard';

type Props = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  node: GetPosts_allPosts_edges_node;
};

export const PostCard: React.FC<Props> = props => {
  const data = props.node;
  const tagsDisplay = data.tags
    .map(item => {
      return item.name;
    })
    .join(" / ");

  return (
    <BaseCard clickable={true}>
      <Link href={"/post/[postId]"} as={"/post/" + data.rawId}>
        <a style={{ textDecoration: "none", color: "inherit" }}>
          <PostLinkTitle>{data.title}</PostLinkTitle>
          <PostLinkMeta>
            <p>tags: {data.tags ? tagsDisplay : "未設定"}</p>
            <p>author: {data.createdBy.name ? data.createdBy.name : "なし"}</p>
            <p>date: {dateFormat(data.createdAt)}</p>
          </PostLinkMeta>
        </a>
      </Link>
    </BaseCard>
  );
};

const PostLinkTitle = styled.h1`
  margin-bottom: 0.25em;
  > a {
    text-decoration: none;
  }
  @media screen and (min-width: 800px) {
    margin-bottom: 0.5em;
  }
`;

const PostLinkMeta = styled.div`
  padding-left: 1.5em;
  & > * {
    font-size: 1.4rem;
  }
`;
