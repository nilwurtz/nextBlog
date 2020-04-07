module.exports = {
  client: {
    includes: ["./src/**/*.tsx", "./src/**/*.ts"],
    service: {
      name: "ragnar-blog-backend",
      url: process.env.BLOG_BACKEND_URL,
    },
  },
};
