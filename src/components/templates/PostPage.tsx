import { Footer } from 'components/common/Footer';
import { Breadcrumb } from 'components/organisms/Breadcrumb';
import { TitleHeader } from 'components/organisms/TitleHeader';
import { MarkDownViewer } from 'components/Post/MarkDownViewer';
import { SocialButtons } from 'components/social/ShareButtons';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { Article } from 'types/api';
import { dateFormat } from 'utils/date';

export const PostPage: React.FC<Article> = props => {
  const paths = [
    { href: "/", label: "Home" },
    { href: "/post", label: "Posts" },
    { href: "/category/[categoryId]", as: `/category/${props.category.id}`, label: props.category.name },
    { href: "/post/[postId]", as: `/post/${props.id}`, label: props.title },
  ];
  return (
    <>
      <Head>
        <title key="title">{props.title} - Ragnar Blog</title>
        <meta name="keywords" content={props.tags.map(item => item.name).join(",")}></meta>
      </Head>
      <TitleHeader
        title={props.title}
        category={props.category.name}
        date={dateFormat(props.publishedAt)}
        tags={props.tags.map(i => {
          return { id: i.id, name: i.name };
        })}
      />
      <Root>
        <ContentArea>
          <Breadcrumb paths={paths} />
          <MarkDownViewer md={props.body} />
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
