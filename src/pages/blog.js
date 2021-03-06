import React from 'react'
import { graphql } from 'gatsby'

import BlogPage from '../components/BlogPage'
import PostList from '../components/PostList'

const Blog = ({ data }) => {
  const { blogTitle, description } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <BlogPage title={blogTitle} description={description}>
      <BlogPage.Header />
      <PostList posts={posts} />
      <BlogPage.Footer />
    </BlogPage>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        blogTitle
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
            title
            date
            humanDate: date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
