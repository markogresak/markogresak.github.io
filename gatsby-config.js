require('dotenv').config()

const blogTitle = `OutOfMemory Blog`
const siteUrl = `https://gresak.io/`
const blogUrl = `${siteUrl}blog/`
const rssUrl = `/blog/rss.xml`

module.exports = {
  siteMetadata: {
    title: blogTitle,
    author: `Marko Grešak`,
    homepageTitle: `Marko Grešak`,
    blogTitle,
    description: `Marko Grešak. Web developer who is striving to improve in all areas. Loving all JavaScript and React related things! Writer of OutOfMemory blog.`,
    heading: `My latest blog posts`,
    fullDescription: [
      `<em>Web Developer</em>, striving to improve in all areas`,
      `Loving all JavaScript and React related things!`,
    ],
    readMoreText: `Read older posts`,
    siteUrl,
    newIssueUrl: `https://github.com/markogresak/markogresak.github.io/issues/new`,
    discussUrl: `https://mobile.twitter.com/search?q=${encodeURIComponent(
      siteUrl,
    )}`,
    blogUrl,
    rssUrl,
    links: {
      title: `Links`,
      items: [
        {
          title: `Github`,
          href: `https://github.com/markogresak`,
          icon: `fab github`,
          iconColor: `var(--gh)`,
        },
        {
          title: `Stack Overflow`,
          href: `http://stackoverflow.com/users/1276128/marko-gre%C5%A1ak`,
          icon: `fab stack-overflow`,
          iconColor: `#e6853d`,
        },
        {
          title: `Twitter`,
          href: `https://twitter.com/markogresak`,
          icon: `fab twitter`,
          iconColor: `#55acee`,
        },
        {
          title: `RSS`,
          href: rssUrl,
          icon: `fas rss`,
          iconColor: `#ed9f4f`,
        },
      ],
    },
    site_404: {
      title: `Oops, Not Found`,
      links: [
        {
          title: `Home`,
          href: `/`,
        },
        {
          title: `Blog`,
          href: `/blog`,
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
              maxWidth: 663,
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
          `gatsby-remark-external-links`,
          `gatsby-plugin-catch-links`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: blogUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.description || edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [
                  {
                    // replace relative urls with absolute
                    'content:encoded': edge.node.html.replace(
                      /href="\/blog\//g,
                      blogUrl,
                    ),
                  },
                ],
              })),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        description
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: rssUrl,
            title: blogTitle,
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: blogTitle,
        short_name: blogTitle,
        start_url: `/blog/`,
        background_color: `#ffffff`,
        theme_color: `#3c00e0`,
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
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitHub`,
        fieldName: `github`,
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        },
        // Refetch once per day
        refetchInterval: 24 * 60 * 60,
      },
    },
  ],
}
