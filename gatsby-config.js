require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Marko Grešak`,
    heading: `My latest blog posts`,
    author: `Marko Grešak`,
    description: `Marko Grešak. Web developer who is striving to improve in all areas. Loving all JavaScript and React related things!`,
    fullDescription: [
      `<em>Web Developer</em> who is striving to improve in all areas`,
      `Loving all JavaScript and React related things!`,
    ],
    siteUrl: `https://gresak.io/`,
    links: {
      title: "Links",
      items: [
        {
          title: "Github",
          href: "https://github.com/markogresak",
          icon: "github",
          color: "#25292e",
        },
        {
          title: "Stack Overflow",
          href: "http://stackoverflow.com/users/1276128/marko-gre%C5%A1ak",
          icon: "stack-overflow",
          color: "#e6853d",
        },
        {
          title: "Twitter",
          href: "https://twitter.com/markogresak",
          icon: "twitter",
          color: "#55acee",
        },
      ],
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Marko Grešak`,
        short_name: `gresak.io`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        },
        // Refetch once per day
        refetchInterval: 24 * 60 * 60,
      },
    },
  ],
}
