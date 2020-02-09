import React from 'react';

export const GoogleAnalytics: React.FC = () => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){ window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.GA_TRACKING_ID}');})`,
        }}
      />
    </>
  );
};
