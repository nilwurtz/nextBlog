import React from 'react';
import styled from 'styled-components';

import { SocialUrls } from '../../../config/social';

export const TwitterIcon: React.FC = () => {
  return (
    <a href={SocialUrls.twitter}>
      <img src="/tw_icon.png" alt="twitter icon" width="50px" height="50px" />
    </a>
  );
};
