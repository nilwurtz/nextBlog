import { FaceBookShare } from 'components/atoms/social/FaceBookShare';
import { TwitterShare } from 'components/atoms/social/TwitterShare';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ShareLinks } from '../../../config/social';

type Props = {
  style?: React.CSSProperties;
  vertical?: boolean;
};

type LinkProps = {
  twitter: string;
  facebook: string;
};

const BaseSocialButtons: React.FCX<Props> = props => {
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
    <div className={props.className} style={props.style}>
      <div className="container" style={alignStyle}>
        <TwitterShare onClick={() => LinkOpen(links.twitter)} />
        <FaceBookShare onClick={() => LinkOpen(links.facebook)} />
      </div>
    </div>
  );
};

export const SocialButtons = styled(BaseSocialButtons)`
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    & > * {
      margin: 0.5em 0.5em;
    }
  }
`;
