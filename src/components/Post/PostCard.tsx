import matter from 'gray-matter';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';
import { dateFormat } from '../../utils/date';

type Props = {
  fileName: string;
  md: matter.GrayMatterFile<any>;
};

export const PostCard: React.FC<Props> = props => {
  const handler = (): void => {
    Router.push({
      pathname: "/post/" + props.fileName,
    });
  };
  const meta = props.md.data;
  const formattedDate = meta.date ? dateFormat(meta.date) : "2000-01-01";
  return (
    <Root onClick={handler}>
      <h1>{meta.title}</h1>
      <p>tags: {meta.tags ? meta.tags : "未設定"}</p>
      <p>author: {meta.author ? meta.author : "なし"}</p>
      <p>date: {formattedDate}</p>
    </Root>
  );
};

const Root = styled.div`
  background: white;
  color: ${color.primary.dark};
  padding: 3em;
  border: 1.5px solid ${color.primary.dark};
  transition: background-color 250ms ease-out;
  position: relative;
  & :hover {
    background: ${color.white};
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0px;
    height: calc(100% - 1px);
    width: 20px;
    background-color: pink;
  }
`;
