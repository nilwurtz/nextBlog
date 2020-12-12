import nprogress from 'nprogress';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import fonts from '../../../config/fonts';

export const Fetching: React.FC = () => {
  useEffect(() => {
    nprogress.start();
    return () => nprogress.done();
  });
  return <Root>{"Fetching..."}</Root>;
};

const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-family: ${fonts.logo};
  z-index: 999;
`;
