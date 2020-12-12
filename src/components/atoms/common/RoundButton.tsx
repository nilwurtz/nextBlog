import React from 'react';
import styled from 'styled-components';

import color from '../../../config/color';

type Props = {
  label: string;
  style?: React.CSSProperties;
};

export const RoundButton: React.FC<Props> = props => {
  return <Button style={props.style}>{props.label}</Button>;
};

const Button = styled.button`
  border: 2px solid ${color.secondary};
  border-radius: 3em;
  font-size: 1.7rem;
  color: ${color.secondary};
  padding: 0.5em 1em;
`;
