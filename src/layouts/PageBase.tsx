import { NextComponentType } from 'next';
import React from 'react';
import styled from 'styled-components';

export const PageBase: NextComponentType = props => {
  return (
    <Root>
      <div />
      {props.children}
      <div />
    </Root>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
`;
