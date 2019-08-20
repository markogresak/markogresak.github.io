import React from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'

import typography, { rhythm, scale } from '../utils/typography'
import { primaryColor } from '../utils/colors'

import SEO from './Seo'

const globalStyles = css`
  a {
    color: ${primaryColor};
    text-decoration: none;
    transition: box-shadow 0.2s;

    &:hover {
      text-decoration: none;
      box-shadow: 0 1px 0 0 currentColor;
    }
  }

  .gatsby-resp-image-link {
    text-decoration: none !important;
    box-shadow: none !important;
  }

  hr {
    background: none;
    text-align: center;
    margin: 0;
    height: 3rem;

    &:before {
      color: ${primaryColor};
      content: '...';
      letter-spacing: ${typography.options.baseFontSize};
      ${scale(1.5)};
      line-height: 0;
    }
  }
`

const Layout = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(27)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const Page = ({ children, title, description, className }) => {
  return (
    <>
      <SEO title={title} description={description} />
      <Global styles={globalStyles} />
      <Layout className={className}>{children}</Layout>
    </>
  )
}

export default Page
