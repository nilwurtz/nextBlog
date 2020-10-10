import React from 'react';
import ReactMarkdown from 'react-markdown';
import { breaks } from 'remark-breaks';
import styled from 'styled-components';

import color from '../../config/color';
import { CodeBlock } from './CodeBlock';

type Props = {
  md: string;
};

export const MarkDownViewer: React.FC<Props> = (props: Props) => {
  return <MarkDownArea source={props.md} renderers={{ code: CodeBlock }} plugins={[breaks]} />;
};

const MarkDownArea = styled(ReactMarkdown)`
  word-break: break-all;
  & h1 {
    margin: 4rem 0 2rem 0;
    padding-bottom: 5px;
    border-bottom: 1px solid ${color.primary.dark};
  }
  & h2 {
    margin: 3.5rem 0 2rem 0;
    padding-bottom: 5px;
    padding-left: 1rem;
    border-bottom: 1px solid ${color.primary.main};
    position: relative;
    &:before {
      content: "";
      top: 0;
      left: 0px;
      background-color: pink;
      position: absolute;
      width: 5px;
      height: 100%;
    }
  }
  & h3,
  h4,
  h5,
  h6 {
    padding: 2rem 0;
  }
  & p {
    font-size: 1.5rem;
    margin: 0.5em 0;
  }
  & p code,
  li code {
    padding: 0.1em 0.4em;
    background-color: ${color.white};
    font-size: inherit;
  }
  & code {
    font-family: "Source Code Pro", monospace;
    font-size: 1.3rem;
  }
  & hr {
    margin: 5rem 0;
  }
  & blockquote {
    margin: 2rem 2rem;
    position: relative;
    color: gray;

    &:before {
      position: absolute;
      content: "";
      top: 0;
      left: -1em;
      background-color: ${color.primary.main};
      border-radius: 5px;
      height: 100%;
      width: 5px;
    }
    & blockquote:before {
      background-color: ${color.primary.light};
    }
  }
  & ul {
    padding-left: 2rem;
  }
  & li {
    padding: 1rem 0;
  }
  & img {
    overflow: scroll;
  }

  @media screen and (min-width: 800px) {
    & p {
      font-size: 1.6rem;
    }
    & code {
      font-size: 1.7rem;
    }
  }
`;
