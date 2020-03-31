module.exports = {
  client: {
    includes: ["./src/**/*.tsx", "./src/**/*.ts"],
    service: {
      name: "ragnar-blog-backend",
      url: "https://ragnar-blog-backend.herokuapp.com/graphql/",
    },
  },
};
