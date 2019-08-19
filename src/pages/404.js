import React from "react"
import { Link, graphql } from "gatsby"
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
    color: rgba(33, 33, 33, 0.5);
  }

  &:last-child:after {
    display: none;
  }
`

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const { title, text, links } = data.site.siteMetadata.site_404

    return (
      <Page title={title}>
        <Layout css={{ padding: 0 }}>
          <Container>
            <Title>
              <Logo />
            </Title>
            {text.map(paragraph => (
              <p dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}

            <nav>
              <Links>
                {links.map(({ title, href }) => (
                  <LinkItem key={title}>
                    {href.indexOf("/") === 0 ? (
                      <Link to={href} title={title}>
                        {title}
                      </Link>
                    ) : (
                      <a href={href} title={title}>
                        {title}
                      </a>
                    )}
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
