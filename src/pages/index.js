import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import AboutMe from "../components/AboutMe"
import PostList from "../components/PostList"

const HomePage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const { title, description, heading, readMoreText } = data.site.siteMetadata

  return (
    <Page title={title} description={description}>
      <AboutMe />
      <PostList
        title={heading}
        posts={posts}
        readMoreText={readMoreText}
      />
    </Page>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        heading
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
