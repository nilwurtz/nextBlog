import { NextComponentType, NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';
import { TagBadge } from '../common/TagBadge';

type Props = {
  title: string;
  date: string;
  tags: { id: number | string; label: string }[];
};

export const TitleHeader: NextComponentType<NextPageContext, {}, Props> = props => {
  return (
    <Root>
      <TitleArea>
        <h1>{props.title}</h1>
        <p>Date: {props.date}</p>
        <p>
          Tags:{" "}
          <Tags>
            {props.tags.map(item => {
              return <TagBadge key={item.id} href="#" label={item.label} />;
            })}
          </Tags>
        </p>
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
  word-break: break-all;
  & p {
    margin: 0.5rem 0;
  }

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
    }
  }
`;

const Tags = styled.div`
  display: inline-flex;
  > * {
    margin: 0 0.3em;
  }
`;
