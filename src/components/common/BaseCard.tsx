import { NextComponentType, NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

type Props = {
  style?: React.CSSProperties;
  clickable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const BaseCard: NextComponentType<NextPageContext, {}, Props> = props => {
  return (
    <Root clickable={props.clickable} onClick={props.onClick} style={props.style}>
      {props.children}
    </Root>
  );
};

const Root = styled.div<{ clickable: boolean }>`
  background: white;
  color: ${color.primary.dark};
  padding: 3em;
  border: 1.5px solid ${color.primary.dark};
  transition: background-color 250ms ease-out;
  position: relative;

  & :hover {
    background: ${({ clickable }): string => (clickable ? color.white : "inherit")};
  }
  &:before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0.5px;
    height: calc(100% - 1px);
    @media screen and (min-width: 800px) {
      top: 1px;
      left: 0.5px;
      height: calc(100% - 1px);
    }
    width: 20px;
    background-color: pink;
  }
`;
