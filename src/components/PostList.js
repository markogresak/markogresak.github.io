import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import PostDate from './PostDate'
import AnimatedArrow from './AnimatedArrow'

import { rhythm } from '../utils/typography'

const Title = styled.h3`
  font-weight: 400;
  margin-top: ${rhythm(1.5)};
  margin-bottom: 0;
`

const Header = styled.header`
  margin-bottom: ${rhythm(0.25)};
`

const ReadMoreContainer = styled.div`
  margin-top: ${rhythm(1)};
`

const PostList = ({ posts, readMoreText }) => {
  return (
    <>
      {posts.map(({ node: post }) => {
        const title = post.frontmatter.title || <i>(Untitled)</i>
        return (
          <article key={post.fields.slug}>
            <Header>
              <Title>
                <Link to={post.fields.slug}>{title}</Link>
              </Title>
              <PostDate post={post} />
            </Header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      {readMoreText && (
        <ReadMoreContainer>
          <Link to="/blog">
            <AnimatedArrow right>{readMoreText}</AnimatedArrow>
          </Link>
        </ReadMoreContainer>
      )}
    </>
  )
}

export default PostList
