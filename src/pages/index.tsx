import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { IndexHeader } from '../containers/IndexHeader';

const Index: NextPage = () => (
  <div>
    <IndexHeader />
    <SampleContent />
  </div>
);

export default Index;

const SampleContent = styled.div`
  height: 150vh;
  background: gray;
`;
