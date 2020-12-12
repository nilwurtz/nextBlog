import React from 'react';
import styled from 'styled-components';

import color from '../../../config/color';

type Props = {
  style?: React.CSSProperties;
  clickable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const BaseCardRoot: React.FCX<Props> = props => {
  const className = props.clickable ? props.className + " clickable" : props.className;
  return (
    <div className={className} onClick={props.onClick} style={props.style}>
      {props.children}
    </div>
  );
};

export const BaseCard = styled(BaseCardRoot)`
  background: white;
  color: ${color.primary.dark};
  padding: 3em;
  border: 1.5px solid ${color.primary.dark};
  transition: background-color 250ms ease-out;
  position: relative;

  &.clickable :hover {
    background: ${color.white};
  }
  & :hover {
    background: "inherit";
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
