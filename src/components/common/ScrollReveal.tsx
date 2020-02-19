import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { scrollTop } from '../../utils/scroll';

type Props = {
  revealHeight?: number;
};

export const ScrollReveal: React.FC<Props> = props => {
  const [appear, setAppear] = useState(false);
  const [elementHeight, setElementHeight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const onScroll = (): void => {
    const position = scrollTop();
    if (position >= elementHeight - window.parent.screen.height + props.revealHeight) {
      setAppear(true);
    } else {
      setAppear(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return (): void => document.removeEventListener("scroll", onScroll);
  });
  useEffect(() => {
    const onLoadHeight = ref.current.getBoundingClientRect().top + window.pageYOffset;
    setElementHeight(onLoadHeight);
    if (onLoadHeight < window.parent.screen.height) {
      setAppear(true);
    }
  }, []);

  return (
    <Root className={appear ? "appear" : ""} ref={ref}>
      {props.children}
    </Root>
  );
};

const Root = styled.div`
  opacity: 0;
  transition: opacity 350ms ease-in;
  width: 100%;
  height: 100%;
  &.appear {
    opacity: 1;
  }
`;
