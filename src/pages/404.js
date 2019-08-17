import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Page from "../components/Page"
import Logo from "../components/Logo"
import Layout from "../components/Layout"

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

const Links = styled.ul`
  list-style: none;
  margin-left: 0;
`

const LinkItem = styled.li`
  display: inline;

  &:after {
    content: " | ";
    color: #83a0a5;
  }

  &:last-child:after {
    display: none;
  }
`

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const { title, links } = data.site.siteMetadata.site_404

    return (
      <Page title={title}>
        <Layout style={{ padding: 0 }}>
          <Container>
            <Title>
              <Logo />
            </Title>
            <p>
              I swear, I've checked everywhere and it seems I have forgotten
              where I put what you were looking for.
            </p>
            <p>Mail me to get this problem fixed!</p>

            <nav>
              <Links>
                {links.map(({ title, href }) => (
                  <LinkItem key={title}>
                    <a href={href} title={title}>
                      {title}
                    </a>
                  </LinkItem>
                ))}
              </Links>
            </nav>
          </Container>
        </Layout>
      </Page>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        site_404 {
          title
          links {
            title
            href
          }
        }
      }
    }
  }
`
