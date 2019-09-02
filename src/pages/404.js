import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'

import Page from '../components/Page'
import Logo from '../components/Logo'
import LinksList from '../components/LinksList'
import Link from '../components/Link'

import { rhythm } from '../utils/typography'

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
  const { newIssueUrl, site_404 } = data.site.siteMetadata
  const { title, links } = site_404

  return (
    <Page title={title} css={{ padding: 0 }}>
      <Container>
        <Title>
          <Logo lettersAlwaysVisible />
        </Title>
        <p>
          I swear, I've checked everywhere, and it seems I have forgotten where
          I put what you were looking for{' '}
          <span role="img" aria-label="disappointed face">
            😞
          </span>
        </p>
        <p>
          If you were expecting to find a blog post or if you think there's a
          problem, please <Link href={issuesUrl}>file an issue</Link> to get
          this problem fixed.
        </p>

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
        newIssueUrl
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
