import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "@emotion/styled"

import { rhythm, scale } from "../utils/typography"

const Wrapper = styled.div`
  text-align: center;
  font-weight: 300;
`

const Name = styled.h1`
  ${scale(1.6)};
  margin-top: ${rhythm(1)};
  border-bottom: none;
`

const AboutMeList = styled.ul`
  list-style: none;
  ${scale(0.25)};
  margin: 0;
  margin-top: ${rhythm(1.5)};
`

const AboutMeItem = styled.li`
  margin-top: ${rhythm(0.5)};
  margin-bottom: 0;
`

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    query AboutMeQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 300, height: 300, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const { title, description } = data.site.siteMetadata

  return (
    <Wrapper>
      <Name>{title}</Name>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt="Profile image"
        style={{
          display: "block",
          margin: "0 auto",
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <AboutMeList>
        {description.map((item, i) => (
          <AboutMeItem key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </AboutMeList>
    </Wrapper>
  )
}

export default AboutMe
