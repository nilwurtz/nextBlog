import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/camelcase
import { Article } from '../../types/api';
import { dateFormat } from '../../utils/date';
import { BaseCard } from '../atoms/common/BaseCard';

type Props = Article;

export const PostCard: React.FC<Props> = props => {
  const tagsDisplay = props.tags
    .map(item => {
      return item.name;
    })
    .join(" / ");

  return (
    <BaseCard clickable={true}>
      <Link href={`/post/${props.id}`}>
        <a style={{ textDecoration: "none", color: "inherit" }}>
          <PostLinkTitle>{props.title}</PostLinkTitle>
          <PostLinkMeta>
            <p>tags: {props.tags ? tagsDisplay : "未設定"}</p>
            <p>date: {dateFormat(props.publishedAt)}</p>
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
