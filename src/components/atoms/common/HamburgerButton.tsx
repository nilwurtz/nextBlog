import { NextComponentType, NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

export const HamburgerButton: NextComponentType<NextPageContext, {}, Props> = props => {
  return (
    <Hamburger onClick={props.onClick} style={props.style}>
      <div className="ham-icon" style={{ top: 0 }}></div>
      <div className="ham-icon" style={{ top: 10 }}></div>
      <div className="ham-icon" style={{ bottom: 0 }}></div>
    </Hamburger>
  );
};

const Hamburger = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  display: inline-block;
  box-sizing: border-box;
  & div {
    position: absolute;
    left: 0;
    height: 4px;
    width: 24px;
    background-color: white;
    border-radius: 2px;
    display: inline-block;
  }
`;
