import React from 'react';
import styled from 'styled-components';

import { GitHubIcon } from '../components/atoms/social/GitHubIcon';
import { QiitaIcon } from '../components/atoms/social/QiitaIcon';
import { TwitterIcon } from '../components/atoms/social/TwitterIcon';

export const SocialLinks: React.FC = () => {
  return (
    <Root>
      <TwitterIcon />
      <GitHubIcon />
      <QiitaIcon />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  & > * {
    margin: 0 0.5em;
  }
`;
