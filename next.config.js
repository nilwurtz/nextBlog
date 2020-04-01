require("dotenv").config();
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  webpack: config => {
    config.node = {
      fs: "empty",
    };
    // Perform customizations to config
    // Important: return the modified config
    return config;
  },
};
