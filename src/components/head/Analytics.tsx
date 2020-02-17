import React from 'react';

export const GoogleAnalytics: React.FC = () => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-158100669-1');`,
        }}
      />
    </>
  );
};
