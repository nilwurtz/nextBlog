import React from 'react';

import { Container } from './Container';
import { LikeItem, WhichBox, WhichItem } from './WhichBox';

export const CatOrDog: React.FC = () => {
  return (
    <Container>
      <WhichBox>
        <LikeItem>
          <p>ネコ</p>
        </LikeItem>
        <WhichItem>
          <p>犬</p>
        </WhichItem>
      </WhichBox>
    </Container>
  );
};
