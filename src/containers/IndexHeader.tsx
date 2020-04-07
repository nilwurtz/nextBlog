import { NextComponentType } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import color from '../config/color';
import fonts from '../config/fonts';

export const IndexHeader: NextComponentType = () => {
  const [onLoad, setOnLoad] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setOnLoad(true), 200);
    return (): void => clearTimeout(timer);
  }, []);

  return (
    <Root>
      <Title>
        <div className={onLoad ? "loaded" : ""}>
          <h1>Ragnar Blog</h1>
          <p>細かなアウトプットを目指すエンジニアのブログ。</p>
        </div>
      </Title>
    </Root>
  );
};

const Root = styled.div`
  background: radial-gradient(${color.primary.main}, ${color.primary.dark});
  height: 35vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  /* desktop */
  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: 20vw 1fr 20vw;
  }
`;

const Title = styled.div`
  grid-column: 2/3;
  transform: translateY(-25%);
  & h1 {
    font-size: 3rem;
    font-family: ${fonts.logo};
  }
  & p {
    font-size: 1.5rem;
    font-family: ${fonts.logoSubtitle};
  }
  & > div {
    grid-row: 2/3;
    position: relative;
    & > * {
      transition: text-shadow 300ms ease-in 600ms, transform 300ms ease-in 300ms;
    }

    &:before,
    &:after {
      position: absolute;
      content: "";
      display: block;
      background-color: white;
      height: 2px;
      width: 100%;
      transform: scaleX(0);
      transition: transform 600ms ease-in;
    }
    &:before {
      top: -2rem;
      left: 0;
      transform-origin: left;
    }
    &:after {
      bottom: -2rem;
      right: 0;
      transform-origin: right;
    }
  }
  & > div.loaded {
    & > * {
      text-shadow: 1px 2px 3px #808080;
      transform: translateY(-4px);
    }
    &:before,
    &:after {
      transform: scaleX(1);
    }
  }

  /* desktop */
  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-rows: 1fr min-content 2fr;
    width: 100%;
  }
`;
