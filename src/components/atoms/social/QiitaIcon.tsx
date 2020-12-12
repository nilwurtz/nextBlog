import React from 'react';
import styled from 'styled-components';

import { SocialUrls } from '../../../config/social';

export const QiitaIcon: React.FC = () => {
  return (
    <a href={SocialUrls.qiita}>
      <Img src="/qi_icon.png" alt="Qiita icon" width="125px" height="50px" />
    </a>
  );
};

const Img = styled.img`
  border-radius: 50px;
`;
