import React from "react"
import { Link } from "gatsby"

import Layout from "./Layout"
import { rhythm } from "../utils/typography"

import ReadMore from "./ReadMore"

const PostList = ({ title, posts, readMoreText }) => {
  return (
    <Layout title={title}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || <i>(Untitled)</i>
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
      {readMoreText && <ReadMore>{readMoreText}</ReadMore>}
    </Layout>
  )
}

export default PostList
