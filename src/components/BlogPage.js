import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import Page from "../components/Page"
import AboutMe from "../components/AboutMe"
import Logo from "../components/Logo"

import { rhythm } from "../utils/typography"

const HeaderLogo = styled.h2`
  margin-top: 0;
  margin-bottom: ${rhythm(2)};
  border-bottom: none;
`

const Footer = styled.footer`
  border-top: 2px solid ${primaryColor};
  margin-top: ${rhythm(1.5)};
  padding-top: ${rhythm(1.5)};
`

const BlogPage = ({ title, description, children }) => {
  return (
    <Page title={title} description={description}>
      {children}
    </Page>
  )
}

BlogPage.Header = ({ children }) => (
  <header>
    <HeaderLogo>
      <Link to="/blog">
        <Logo />
      </Link>
    </HeaderLogo>
    {children}
  </header>
)

BlogPage.Footer = ({ children }) => (
  <Footer>
    <AboutMe />
    {children}
  </Footer>
)

export default BlogPage
