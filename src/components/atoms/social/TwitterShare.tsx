import color from 'config/color';
import React from 'react';
import styled from 'styled-components';

import { MaskPng } from '../common/MaskPng';

type Props = {
  onClick?: () => void;
};

const BaseTwitterShare: React.FCX<Props> = props => {
  return <MaskPng className={props.className} onClick={props.onClick} />;
};

export const TwitterShare = styled(BaseTwitterShare)`
  mask-image: url(/tw_share.png);
  &:hover {
    background: ${color.twitter};
  }
`;
