import React from 'react';
import ReactMarkdown from 'react-markdown';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styled from 'styled-components';

import color from '../../config/color';

type CodeProps = {
  value: string;
  language: string;
};

type CodeLabelProps = {
  lang: string;
  fileName: string | null;
};

const divideCodeLang = (lang: string): CodeLabelProps => {
  if (!lang) {
    return {
      lang: "ldif",
      fileName: null,
    };
  }
  if (lang.includes(":")) {
    const [language, fileName] = lang.split(":");

    return {
      lang: language,
      fileName: fileName,
    };
  } else {
    return {
      lang: lang,
      fileName: null,
    };
  }
};

const CodeBlock: React.FC<CodeProps> = (props: CodeProps) => {
  const codeProps = divideCodeLang(props.language);
  return (
    <>
      {codeProps.fileName ? <CodeLabel>{codeProps.fileName}</CodeLabel> : null}

      <CodeArea language={codeProps.lang} style={tomorrowNightBlue}>
        {props.value}
      </CodeArea>
    </>
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

const CodeLabel = styled.div`
  background: ${color.white};
  color: ${color.primary.dark};
  padding: 0.2em 1.5rem;
  margin: 1.5rem 0;
  transform: translateY(1.5rem);
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${color.secondary};
    height: 100%;
    width: 1rem;
  }

  @media screen and (min-width: 800px) {
    transform: translateY(2rem);
    margin: 0 2rem;
  }
`;

type Props = {
  md: string;
};

export const MarkDownViewer: React.FC<Props> = (props: Props) => {
  return <MarkDownArea source={props.md} renderers={{ code: CodeBlock }} />;
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
  }
  & p code {
    padding: 0.1em 0.4em;
    background-color: ${color.white};
    font-size: inherit;
  }
  & code {
    font-size: 1.3rem;
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
