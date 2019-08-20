import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import Page from '../components/Page'
import AboutMe from '../components/AboutMe'
import Logo from '../components/Logo'

import { rhythm } from '../utils/typography'
import { primaryColor } from '../utils/colors'

const Header = styled.header`
  margin-bottom: ${rhythm(2)};
`

const HeaderLogo = styled.h2`
  margin: 0;
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
  <Header>
    <HeaderLogo>
      <Link
        to="/blog"
        title="OutOfMemory"
        css={{ boxShadow: 'none !important' }}
      >
        <Logo />
      </Link>
    </HeaderLogo>
    {children}
  </Header>
)

BlogPage.Footer = ({ children }) => (
  <Footer>
    <AboutMe />
    {children}
  </Footer>
)

export default BlogPage
