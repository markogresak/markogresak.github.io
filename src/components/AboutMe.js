import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import LinksList from "./LinksList"
import { rhythm, scale } from "../utils/typography"

const mobileMediaQuery = `@media (max-width: 580px)`

const Wrapper = styled.div`
  display: flex;

  ${mobileMediaQuery} {
    flex-wrap: wrap;
    justify-content: center;
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

const AboutMe = () => {
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
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt="Profile image"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </ImageWrapper>
      <div>
        <Name>{title}</Name>
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
                  icon={["fab", icon]}
                  color={iconColor}
                  css={{ marginRight: rhythm(0.25) }}
                  // force same width on all icons
                  className="fa-w-16"
                />
                {title}
                {title === "Github" && <> ({repositoriesCount} projects)</>}
              </>
            )}
          </LinksList>
        </LinksWrapper>
      </div>
    </Wrapper>
  )
}

export default AboutMe
