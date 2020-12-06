import React from 'react';
import styled from 'styled-components';

const ListPageTitleBase: React.FCX = props => {
  return <div className={props.className}>{props.children}</div>;
};

export const ListPageTitle = styled(ListPageTitleBase)`
  text-align: center;
  font-size: 2rem;
  margin: 2em;
`;
