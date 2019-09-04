import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import Page from './Page'
import AboutMe from './AboutMe'
import Logo from './Logo'
import Link from './Link'
import LinksList from './LinksList'

import { rhythm } from '../utils/typography'
import { primaryColor } from '../utils/colors'

const HeaderContainer = styled.header`
  margin-bottom: ${rhythm(2)};
`

const HeaderLogo = styled.h2`
  margin: 0;
  border-bottom: none;
`

const FooterContainer = styled.footer`
  margin-top: ${rhythm(2)};
`

const FooterMain = styled.div`
  border-top: 2px solid ${primaryColor};
  margin-top: ${rhythm(0.5)};
  padding-top: ${rhythm(1.5)};
`

const Header = ({ children, withLink }) => (
  <HeaderContainer>
    <HeaderLogo>
      {withLink ? (
        <Link
          href="/blog"
          title="OutOfMemory"
          css={{ boxShadow: 'none !important' }}
        >
          <Logo />
        </Link>
      ) : (
        <Logo lettersAlwaysVisible />
      )}
    </HeaderLogo>
    {children}
  </HeaderContainer>
)

const Footer = ({ children, links = [] }) => {
  const data = useStaticQuery(graphql`
    query BlogPageFooterQuery {
      site {
        siteMetadata {
          rssLink {
            title
            href
            icon
            iconColor
          }
        }
      }
    }
  `)

  return (
    <FooterContainer>
      <LinksList
        links={[
          ...links,
          {
            ...data.site.siteMetadata.rssLink,
            right: true,
          },
        ]}
      />
      <FooterMain>
        <AboutMe linkToHome />
        {children}
      </FooterMain>
    </FooterContainer>
  )
}

const BlogPage = ({ title, description, children }) => {
  return (
    <Page title={title} description={description}>
      {children}
    </Page>
  )
}

BlogPage.Header = Header
BlogPage.Footer = Footer

export default BlogPage
