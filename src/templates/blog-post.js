import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Page from "../components/Page"
import AboutMe from "../components/AboutMe"
import AnimatedArrow from "../components/AnimatedArrow"
import Logo from "../components/Logo"

import typography, { rhythm, scale } from "../utils/typography"

const HeaderLogo = styled.h2`
  margin-top: 0;
  margin-bottom: ${rhythm(2)};
  border-bottom: none;
`

const Title = styled.h1`
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: ${rhythm(0.25)};
  ${scale(1.1)};
`

const Date = styled.p`
  ${scale(-1 / 5)};
  display: block;
  margin-top: ${rhythm(0.25)};
  margin-bottom: ${rhythm(1)};
`

const Article = styled.article`
  ${scale(0.3)};
  line-height: ${typography.options.baseLineHeight};
`

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-top: ${rhythm(1)};
`

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Page
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    >
      <Article>
        <header>
          <HeaderLogo>
            <Link to="/blog">
              <Logo />
            </Link>
          </HeaderLogo>
          <Title>{post.frontmatter.title}</Title>
          <Date>{post.frontmatter.date}</Date>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <footer>
          <AboutMe />
        </footer>
      </Article>

      <nav>
        <NavList>
          <li>
            {previous && (
              <AnimatedArrow left>
                Previous post:{" "}
                <Link to={previous.fields.slug} rel="prev">
                  {previous.frontmatter.title}
                </Link>
              </AnimatedArrow>
            )}
          </li>
          <li
            css={css`
              margin-left: auto;
            `}
          >
            {next && (
              <AnimatedArrow right>
                Next post:{" "}
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title}
                </Link>
              </AnimatedArrow>
            )}
          </li>
        </NavList>
      </nav>
    </Page>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
