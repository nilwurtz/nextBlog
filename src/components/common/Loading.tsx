import { useRouter } from 'next/router';
import nprogress from 'nprogress';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import fonts from '../../config/fonts';

export const Loading: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = url => {
      if (url !== router.pathname) {
        setLoading(true);
        nprogress.start();
      }
    };
    const handleComplete = url => {
      if (url !== router.pathname) {
        setLoading(false);
        nprogress.done();
      }
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading && <Root>{"Rendering..."}</Root>;
};

const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-family: ${fonts.logo};
  z-index: 999;
`;
