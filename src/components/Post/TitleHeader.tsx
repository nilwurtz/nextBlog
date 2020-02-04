import { NextComponentType, NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

type Props = {
  title: string;
  date: string;
};

export const TitleHeader: NextComponentType<NextPageContext, {}, Props> = props => {
  return (
    <Root>
      <TitleArea>
        <h1>{props.title}</h1>
        <p>Date: {props.date}</p>
      </TitleArea>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  color: ${color.primary.dark};
  @media screen and (min-width: 800px) {
    height: 20vh;
    background-color: white;
    display: grid;
    grid-template-columns: 10vw 1fr 10vw;
  }
`;

const TitleArea = styled.div`
  font-size: 1.3rem;
  margin: 1rem;

  @media screen and (min-width: 800px) {
    font-size: 5rem;
    grid-column: 2/3;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin: 0;
    margin-top: 3rem;
    & h1 {
      font-size: 4rem;
    }
    & p {
      font-size: 2rem;
      margin: 0.5rem 0;
    }
  }
`;
