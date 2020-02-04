import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styled from 'styled-components';

import color from '../../config/color';

type CodeProps = {
  value: string;
  language: string;
};

const CodeBlock: React.FC<CodeProps> = (props: CodeProps) => {
  return (
    <CodeArea language={props.language} style={tomorrowNightBlue}>
      {props.value}
    </CodeArea>
  );
};

const CodeArea = styled(SyntaxHighlighter)`
  margin: 1.5rem 0;
  & pre {
    overflow-x: scroll;
  }
  @media screen and (min-width: 800px) {
    margin: 2rem;
  }
`;

type Props = {
  md: string;
};

export const MarkDownViewer: React.FC<Props> = (props: Props) => {
  return <MarkDownArea source={props.md} renderers={{ code: CodeBlock }} />;
};

const MarkDownArea = styled(ReactMarkdown)`
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
      left: -5px;
      background-color: pink;
      position: absolute;
      width: 5px;
      height: calc(100% + 2px);
    }
  }
  & h3,
  h4,
  h5,
  h6 {
    padding: 2rem 0;
  }
  & p code {
    padding: 0.1em 0.4em;
    background-color: ${color.white};
  }
  & ul {
    padding-left: 2rem;
  }
  & li {
    padding: 1rem 0;
  }
`;
