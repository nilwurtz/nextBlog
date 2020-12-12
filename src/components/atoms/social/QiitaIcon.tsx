import React from 'react';
import styled from 'styled-components';

import { SocialUrls } from '../../../config/social';

const BaseQiitaIcon: React.FCX = props => {
  return (
    <a href={SocialUrls.qiita}>
      <img className={props.className} src="/qi_icon.png" alt="Qiita icon" width="125px" height="50px" />
    </a>
  );
};

export const QiitaIcon = styled(BaseQiitaIcon)`
  border-radius: 50%;
`;
