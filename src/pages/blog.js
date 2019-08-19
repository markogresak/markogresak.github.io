import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import PostList from "../components/PostList"
import AboutMe from "../components/AboutMe"
import BlogHeader from "../components/BlogHeader"

const BlogPage = ({ data }) => {
  const { title, description } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <Page title={title} description={description}>
      <BlogHeader />
      <PostList posts={posts} />
      <hr />
      <footer>
        <AboutMe />
      </footer>
    </Page>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
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
