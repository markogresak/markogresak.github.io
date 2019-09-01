import 'prismjs/themes/prism-solarizedlight.css'

import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from '@emotion/styled'

import BlogPage from '../components/BlogPage'
import AnimatedArrow from '../components/AnimatedArrow'
import PostDate from '../components/PostDate'

import typography, { rhythm, scale } from '../utils/typography'
import { bgDarkColor } from '../utils/colors'

const ArticleTitleContainer = styled.div`
  margin-bottom: ${rhythm(1)};
`

const Title = styled.h1`
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: ${rhythm(0.25)};
  ${scale(1.1)};
`

const Article = styled.article`
  ${scale(0.3)};
  line-height: ${typography.options.baseLineHeight};

  a {
    box-shadow: 0 1px 0 0 currentColor;

    &:hover {
      box-shadow: none;
    }

    :not(pre) > code[class*='language-'] {
      padding-bottom: 0;
    }
  }

  /* Inline code blocks */
  /* Important: must include *:not part, otherwise emotion assumes &:not */
  *:not(pre) > code[class*='language-'] {
    white-space: normal;
  }

  [class*='language-'] {
    ${scale(0.1)};
    color: ${bgDarkColor};
  }
`

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: ${rhythm(1)} 0 0;
`

const NavItem = styled.li`
  ${({ right }) => right && `margin-left: auto;`}
`

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <BlogPage
      title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}
      description={post.frontmatter.description || post.excerpt}
    >
      <BlogPage.Header withLink />

      <Article>
        <ArticleTitleContainer>
          <Title>{post.frontmatter.title}</Title>
          <PostDate post={post} />
        </ArticleTitleContainer>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </Article>

      <BlogPage.Footer>
        <nav>
          <NavList>
            <NavItem>
              {previous && (
                <AnimatedArrow left>
                  Previous post:{' '}
                  <Link to={previous.fields.slug} rel="prev">
                    {previous.frontmatter.title}
                  </Link>
                </AnimatedArrow>
              )}
            </NavItem>
            <NavItem right>
              {next && (
                <AnimatedArrow right>
                  Next post:{' '}
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title}
                  </Link>
                </AnimatedArrow>
              )}
            </NavItem>
          </NavList>
        </nav>
      </BlogPage.Footer>
    </BlogPage>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        humanDate: date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
