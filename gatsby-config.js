require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require(`path`);

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: `*`, disallow: `/api` }],
      },
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: process.env.SITE_ID,
        matomoUrl: process.env.MATOMO_URL,
        siteUrl: process.env.SITE_URL,
      },
    },
  ],
  developMiddleware: (app) => {
    app.use(
      "/api/",
      createProxyMiddleware({
        target: "https://localhost:5000",
        secure: false,
        pathRewrite: {
          "/api/": "/api/",
        },
      })
    );
  },
  proxy: {
    prefix: "/api",
    url: "http://localhost:5000",
  },
  siteMetadata: {
    author: "Social Assistant",
    keywords: ["analytics"],
    title: "Social Assistant",
    titleTemplate: "%s · Social Assistant",
    description:
      "Social assistant is an app created to help you get insights on your followers.",
    siteUrl: process.env.SITE_URL, // No trailing slash allowed!
    image: "/mbp.png", // Path to your image you placed in the 'static' folder
    twitterUsername: "@socialassist_ml",
  },
};
