import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  return (
    <FooterContainer>
      <LinksList
        links={[
          ...links,
        ]}
      >
        {({ title, icon, iconColor }) => (
          <>
            {icon && (
              <FontAwesomeIcon
                icon={icon.split(' ')}
                color={iconColor}
                css={{ marginRight: rhythm(0.25) }}
                // force same width on all icons
                style={{ width: '1em' }}
              />
            )}
            {title}
          </>
        )}
      </LinksList>
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
