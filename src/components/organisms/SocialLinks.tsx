import React from 'react';
import styled from 'styled-components';

import { GitHubIcon } from '../atoms/social/GitHubIcon';
import { QiitaIcon } from '../atoms/social/QiitaIcon';
import { TwitterIcon } from '../atoms/social/TwitterIcon';

const BaseSocialLinks: React.FCX = props => {
  return (
    <div className={props.className}>
      <TwitterIcon />
      <GitHubIcon />
      <QiitaIcon />
    </div>
  );
};

export const SocialLinks = styled(BaseSocialLinks)`
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  & > * {
    margin: 0 0.5em;
  }
`;
