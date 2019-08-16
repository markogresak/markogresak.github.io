import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import AboutMe from "../components/AboutMe"
import PostList from "../components/PostList"

const BlogIndex = ({ data }) => {
  const { title, description, heading } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <Page title={title} description={description}>
      <AboutMe />
      <PostList title={heading} posts={posts}></PostList>
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
