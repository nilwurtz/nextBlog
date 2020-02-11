import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import color from '../../config/color';
import { ShareLinks } from '../../config/social';

type Props = {
  style?: React.CSSProperties;
  vertical?: boolean;
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

  const alignStyle: React.CSSProperties = props.vertical ? { flexDirection: "column" } : { flexDirection: "row" };

  return (
    <Root style={props.style}>
      <IconContainer style={alignStyle}>
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
  align-items: flex-start;
  flex-direction: row;
  & > * {
    margin: 0.5em 0.5em;
  }
`;

const MaskPng = styled.div`
  height: 50px;
  width: 50px;
  mask: no-repeat center/70%;
  background: ${color.gray};
  transition: background-color 150ms ease-in;
`;

const Twitter = styled(MaskPng)`
  mask-image: url(/tw_share.png);
  &:hover {
    background: ${color.twitter};
  }
`;

const FaceBook = styled(MaskPng)`
  mask-image: url(/fb_share.png);
  &:hover {
    background: ${color.facebook};
  }
`;
