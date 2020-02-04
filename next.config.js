module.exports = {
  webpack: config => {
    // Perform customizations to config
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    // Important: return the modified config
    return config;
  },
};
