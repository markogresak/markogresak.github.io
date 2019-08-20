import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import { rhythm } from '../utils/typography'

import ReadMore from './ReadMore'

const Title = styled.h3`
  margin-bottom: ${rhythm(0.25)};
  font-weight: 400;
`

const PostList = ({ posts, readMoreText }) => {
  return (
    <>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || <i>(Untitled)</i>
        return (
          <article key={node.fields.slug}>
            <header>
              <Title>
                <Link to={node.fields.slug}>{title}</Link>
              </Title>
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
    </>
  )
}

export default PostList
