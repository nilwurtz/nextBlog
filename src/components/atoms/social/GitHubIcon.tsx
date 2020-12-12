import React from 'react';
import styled from 'styled-components';

import { SocialUrls } from '../../../config/social';

export const GitHubIcon: React.FC = () => {
  return (
    <a href={SocialUrls.github}>
      <img src="/gh_icon.png" alt="twitter icon" width="50px" height="50px" />
    </a>
  );
};
