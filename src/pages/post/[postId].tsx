import matter from 'gray-matter';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MarkDownViewer } from '../../components/Post/MarkDownViewer';
import { TitleHeader } from '../../components/Post/TitleHeader';
import { dateFormat } from '../../utils/date';

type Props = {
  md?: matter.GrayMatterFile<any>;
};

const PostDetailPage: NextPage<Props> = props => {
  const meta = props.md.data;
  const formattedDate = meta.date ? dateFormat(meta.date) : "2000-01-01";
  return (
    <React.Fragment>
      <TitleHeader title={meta.title} date={formattedDate} />
      <Root>
        <ContentArea>
          <MarkDownViewer md={props.md.content} />
        </ContentArea>
        <SideArea>
          <div>side content</div>
        </SideArea>
      </Root>
    </React.Fragment>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 5vw calc(100vw - 10vw) 5vw;
  /* desktop */
  @media screen and (min-width: 800px) {
    /* 10vw : 1 : 0.381 : 10vw */
    grid-template-columns: 10vw calc((100vw - 20vw) * 0.724) auto 10vw;
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

PostDetailPage.getInitialProps = async (context: NextPageContext): Promise<any> => {
  const { postId } = context.query;
  const content = await import(`../../md/${postId}.md`);
  const data = matter(content.default);
  return { md: data };
};

export default PostDetailPage;
