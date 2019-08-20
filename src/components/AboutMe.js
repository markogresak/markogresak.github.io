import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import LinksList from './LinksList'
import { rhythm, scale } from '../utils/typography'
import { textColor } from '../utils/colors'

const mobileMediaQuery = `@media (max-width: 580px)`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  ${mobileMediaQuery} {
    flex-wrap: wrap;
  }
`

const ImageWrapper = styled.div`
  flex: 0 0 150px;
  margin-right: ${rhythm(1)};

  ${mobileMediaQuery} {
    flex-basis: 100%;
    text-align: center;
    margin: 0 0 ${rhythm(1)};
  }
`

const LinksWrapper = styled.div`
  ${scale(-0.2)}
  margin-top: ${rhythm(0.5)};

  ${mobileMediaQuery} {
    ${scale(0)}

    li {
      display: block;

      &:after {
        display: none;
      }
    }
  }
`

const Name = styled.h1`
  ${scale(1)};
  margin: 0;
  border-bottom: none;
`

const AboutMeList = styled.ul`
  list-style: none;
  ${scale(0.1)};
  margin: 0;
`

const AboutMeItem = styled.li``

const HomepageLink = ({ linkToHome, children, className }) =>
  linkToHome ? (
    <Link
      to="/"
      title="To Home Page"
      css={{ color: textColor }}
      className={className}
    >
      {children}
    </Link>
  ) : (
    children
  )

const AboutMe = ({ linkToHome }) => {
  const data = useStaticQuery(graphql`
    query AboutMeQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 150, height: 150, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
          fullDescription
          links {
            title
            items {
              title
              href
              icon
              iconColor
            }
          }
        }
      }
      github {
        user(login: "markogresak") {
          repositories(privacy: PUBLIC) {
            totalCount
          }
        }
      }
    }
  `)

  const { title, fullDescription, links } = data.site.siteMetadata
  const { totalCount: repositoriesCount } = data.github.user.repositories

  return (
    <Wrapper>
      <ImageWrapper>
        <HomepageLink
          linkToHome={linkToHome}
          css={{ boxShadow: 'none !important' }}
        >
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt="Profile image"
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        </HomepageLink>
      </ImageWrapper>
      <div>
        <Name>
          <HomepageLink linkToHome={linkToHome}>{title}</HomepageLink>
        </Name>
        <AboutMeList>
          {fullDescription.map((item, i) => (
            <AboutMeItem key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </AboutMeList>
        <LinksWrapper>
          <LinksList links={links.items}>
            {({ title, icon, iconColor }) => (
              <>
                <FontAwesomeIcon
                  icon={['fab', icon]}
                  color={iconColor}
                  css={{ marginRight: rhythm(0.25) }}
                  // force same width on all icons
                  style={{ width: '1em' }}
                />
                {title}
                {title === 'Github' && <> ({repositoriesCount} projects)</>}
              </>
            )}
          </LinksList>
        </LinksWrapper>
      </div>
    </Wrapper>
  )
}

AboutMe.propTypes = {
  linkToHome: PropTypes.bool,
}

export default AboutMe
