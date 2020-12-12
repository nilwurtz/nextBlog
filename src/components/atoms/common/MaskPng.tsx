import color from 'config/color';
import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLDivElement>;

const BaseMaskPng: React.FCX<Props> = props => {
  return <div className={props.className} {...props} />;
};

export const MaskPng = styled(BaseMaskPng)`
  height: 50px;
  width: 50px;
  mask: no-repeat center/70%;
  background: ${color.gray};
  transition: background-color 150ms ease-in;
`;
