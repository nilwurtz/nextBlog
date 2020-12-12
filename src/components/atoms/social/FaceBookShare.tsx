import color from 'config/color';
import React from 'react';
import styled from 'styled-components';

import { MaskPng } from '../common/MaskPng';

type Props = {
  onClick?: () => void;
};

const BaseFaceBookShare: React.FCX<Props> = props => {
  return <MaskPng className={props.className} onClick={props.onClick} />;
};

export const FaceBookShare = styled(BaseFaceBookShare)`
  mask-image: url(/fb_share.png);
  &:hover {
    background: ${color.facebook};
  }
`;
