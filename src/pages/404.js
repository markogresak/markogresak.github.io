import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Page from "../components/Page"
import Logo from "../components/Logo"
import LinksList from "../components/LinksList"

import { rhythm } from "../utils/typography"

const Container = styled.div`
  text-align: center;
  max-width: ${rhythm(18)};
  margin: 0 auto;
  padding: 0 ${rhythm(1)};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  border: none;
  font-size: 50px;
  font-weight: 200;
  margin-top: 0;
`

const NotFoundPage = ({ data }) => {
  const { title, text, links } = data.site.siteMetadata.site_404

  return (
    <Page title={title} css={{ padding: 0 }}>
      <Container>
        <Title>
          <Logo />
        </Title>
        {text.map(paragraph => (
          <p dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}

        <nav>
          <LinksList links={links}>{({ title }) => title}</LinksList>
        </nav>
      </Container>
    </Page>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        site_404 {
          title
          text
          links {
            title
            href
          }
        }
      }
    }
  }
`
