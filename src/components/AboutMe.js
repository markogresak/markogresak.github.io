import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Layout from "./Layout"
import { rhythm, scale } from "../utils/typography"

const Wrapper = styled.div`
  font-weight: 300;
  display: flex;

  @media (max-width: 560px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

const ImageWrapper = styled.div`
  flex: 0 0 150px;
  margin-right: ${rhythm(1)};

  @media (max-width: 560px) {
    margin: 0 0 ${rhythm(1)};
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

const LinksList = styled.ul`
  list-style: none;
  ${scale(0.1)};
  margin: 0;
  margin-top: ${rhythm(0.5)};
`

const IconWrapper = styled.span`
  margin-right: ${rhythm(0.3)};
`

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
              color
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
    <Layout
      css={css`
        padding-bottom: 0;
      `}
    >
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
          <LinksList>
            {links.items.map(({ title, href, icon, color }) => (
              <li key={title}>
                <IconWrapper>
                  <FontAwesomeIcon icon={["fab", icon]} color={color} />
                </IconWrapper>
                <a href={href} title={title}>
                  {title}
                  {title === "Github" && <> ({repositoriesCount} projects)</>}
                </a>
              </li>
            ))}
          </LinksList>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default AboutMe
