import React from 'react';
import styled from 'styled-components';

import { useStep } from '../../hooks/useStep';
import { CodeBlock } from '../Post/CodeBlock';

type Props = {
  code: string;
  language: string;
};

export const LiveCode: React.FC<Props> = props => {
  const codeState = useStep(props.code, 35);
  return (
    <Root>
      <CodeBlock value={codeState} language={props.language} />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  border: 1px solid gray;
  overflow: scroll;
  & > pre {
    margin: 0;
    flex-grow: 2;
    width: 100%;
  }
`;
