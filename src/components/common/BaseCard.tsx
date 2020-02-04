import { NextComponentType, NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

type Props = {
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const BaseCard: NextComponentType<NextPageContext, {}, Props> = props => {
  return (
    <Root onClick={props.onClick} style={props.style}>
      {props.children}
    </Root>
  );
};

const Root = styled.div`
  background: white;
  color: ${color.primary.dark};
  padding: 3em;
  border: 1.5px solid ${color.primary.dark};
  transition: background-color 250ms ease-out;
  position: relative;
  & :hover {
    background: ${color.white};
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0px;
    height: calc(100% - 1px);
    width: 20px;
    background-color: pink;
  }
`;
