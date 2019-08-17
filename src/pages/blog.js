import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import PostList from "../components/PostList"

const BlogIndex = ({ data }) => {
  const { title, description, headingAllPosts } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <Page title={title} description={description}>
      <PostList title={headingAllPosts} posts={posts}></PostList>
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
        headingAllPosts
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
