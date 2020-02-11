import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import color from '../../config/color';
import { ShareLinks } from '../../config/social';

type Props = {
  shareUrl: string;
  text?: string;
  style?: React.CSSProperties;
};

type LinkProps = {
  twitter: string;
  facebook: string;
};

export const SocialButtons: React.FC<Props> = props => {
  const [links, setLinks] = useState<LinkProps>({
    twitter: "",
    facebook: "",
  });
  useEffect(() => {
    const currentPath = window.location.href;
    setLinks({
      twitter: `${ShareLinks.twitter.url}?${ShareLinks.twitter.params.url}=${currentPath}&${ShareLinks.twitter.params.tweetText}=${document.title}`,
      facebook: `${ShareLinks.facebook.url}?${ShareLinks.facebook.params.url}=${currentPath}`,
    });
  }, []);

  const LinkOpen = (url: string) => {
    window.open(url, "newtab");
  };
  return (
    <Root style={props.style}>
      <IconContainer>
        <span>Share</span>
        <Twitter onClick={() => LinkOpen(links.twitter)} />
        <FaceBook onClick={() => LinkOpen(links.facebook)} />
      </IconContainer>
    </Root>
  );
};

const Root = styled.div``;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  & > * {
    margin: 0.5em 1em;
  }
`;

const MaskPng = styled.div`
  height: 50px;
  width: 50px;
  mask: no-repeat center/70%;
  background: ${color.primary.main};
`;

const Twitter = styled(MaskPng)`
  mask-image: url(/tw_share.png);
  &:hover {
    background: ${color.primary.main};
  }
`;

const FaceBook = styled(MaskPng)`
  mask-image: url(/fb_share.png);
  &:hover {
    background: ${color.primary.main};
  }
`;
