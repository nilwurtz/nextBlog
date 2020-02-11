export const SocialUrls = {
  twitter: "https://twitter.com/Ela_ragnar",
  github: "https://github.com/ragnar1904",
  qiita: "https://qiita.com/ragnar1904",
  siteGitRepo: "https://github.com/ragnar1904/nextBlog",
} as const;

export const ShareLinks = {
  twitter: {
    url: "https://twitter.com/intent/tweet",
    params: {
      tweetText: "text",
      url: "url",
    },
  },
  facebook: {
    url: "https://www.facebook.com/share.php",
    params: {
      url: "u",
    },
  },
};
