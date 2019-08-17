import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "@emotion/styled"

import { rhythm } from "../utils/typography"

const Container = styled.span`
  display: inline-flex;
  align-items: center;
`

const LogoImage = styled.span`
  margin-right: ${rhythm(0.5)};
`

const TitleMain = styled.span`
  color: #2d99ba;
`
const TitleSecondary = styled.span`
  color: #83a0a5;
`

const Logo = () => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fixed(width: 67, height: 58, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Container>
      <LogoImage>
        <Image fixed={data.logo.childImageSharp.fixed} alt="Profile image" />
      </LogoImage>
      <TitleMain>Out</TitleMain>
      <TitleSecondary>Of</TitleSecondary>
      <TitleMain>Memory</TitleMain>
    </Container>
  )
}

export default Logo
