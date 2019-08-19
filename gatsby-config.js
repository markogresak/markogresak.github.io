require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Marko Grešak`,
    heading: `My latest blog posts`,
    headingAllPosts: `My blog posts`,
    author: `Marko Grešak`,
    description: `Marko Grešak. Web developer who is striving to improve in all areas. Loving all JavaScript and React related things!`,
    fullDescription: [
      `<em>Web Developer</em>, striving to improve in all areas`,
      `Loving all JavaScript and React related things!`,
    ],
    readMoreText: "Read older posts",
    siteUrl: `https://gresak.io/`,
    links: {
      title: "Links",
      items: [
        {
          title: "Github",
          href: "https://github.com/markogresak",
          icon: "github",
          iconColor: "#25292e",
        },
        {
          title: "Stack Overflow",
          href: "http://stackoverflow.com/users/1276128/marko-gre%C5%A1ak",
          icon: "stack-overflow",
          iconColor: "#e6853d",
        },
        {
          title: "Twitter",
          href: "https://twitter.com/markogresak",
          icon: "twitter",
          iconColor: "#55acee",
        },
      ],
    },
    site_404: {
      title: "Oops, Not Found | gresak.io",
      text: [
        `I swear, I've checked everywhere, and it seems I have forgotten
        where I put what you were looking for <span role="img" aria-label="disappointed face">😞</span>`,
        `If you think there's a problem, please send me a mail me to get
        this problem fixed.`,
      ],
      links: [
        {
          title: "Send a Mail",
          href: "mailto:marko@gresak.io?subject=Huston, we have a problem",
        },
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Blog",
          href: "/blog",
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
