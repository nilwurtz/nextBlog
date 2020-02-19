import React from 'react';

import { CodeBlock } from '../Post/MarkDownViewer';
import { Container } from './Container';
import { LikeItem, WhichBox, WhichItem } from './WhichBox';

type Props = {
  likePyCode: string;
  dislikePyCode: string;
};

export const WhichPython: React.FC<Props> = props => {
  return (
    <Container>
      <WhichBox>
        <WhichItem>
          <CodeBlock value={props.dislikePyCode} language="python" />
        </WhichItem>
        <LikeItem>
          <CodeBlock value={props.likePyCode} language="python" />
        </LikeItem>
      </WhichBox>
    </Container>
  );
};
