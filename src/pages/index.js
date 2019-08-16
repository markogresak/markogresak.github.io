import React from "react"
import { Link, graphql } from "gatsby"

import Page from "../components/page"
import AboutMe from "../components/about-me"
import Links from "../components/links"
import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data }) => {
  const { title, description, heading } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <Page title={title} description={description}>
      <AboutMe />
      <Links />
      <Layout title={heading} spacingBottom>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    </Page>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        heading
      }
    }
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
