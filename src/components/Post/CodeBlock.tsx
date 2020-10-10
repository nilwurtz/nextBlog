import _ from 'lodash';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
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
      lang: "plaintext",
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

export const CodeBlock: React.FC<CodeProps> = (props: CodeProps) => {
  const codeProps = divideCodeLang(props.language);
  return (
    <>
      {codeProps.fileName ? <CodeLabel className="label">{codeProps.fileName}</CodeLabel> : null}

      <CodeArea language={codeProps.lang} style={tomorrowNightBlue}>
        {props.value}
      </CodeArea>
    </>
  );
};

const CodeArea = styled(SyntaxHighlighter)`
  margin: 1.5rem 0;
  & code {
    font-family: "Source Code Pro", monospace;
  }
  font-size: 1.3rem;
  & pre {
    overflow-x: scroll;
  }
  @media screen and (min-width: 800px) {
    margin: 2rem;
    font-size: 1.7rem;
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
