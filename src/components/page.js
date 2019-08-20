import React from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'

import { rhythm, scale } from '../utils/typography'
import { primaryColor } from '../utils/colors'

import SEO from './Seo'

const globalStyles = css`
  :root {
    --background-color: #fff;
    --primary-color: #3c00e0;
    --text-color: rgba(0, 0, 0, 0.8);
    --h1-h2-border-bottom-color: rgba(0, 0, 0, 0.07);
    --h6-color: rgba(0, 0, 0, 0.53);
    --blockquote-color: rgba(0, 0, 0, 0.53);
    --blockquote-border-left-color: rgba(0, 0, 0, 0.53);
    --icon-github-color: #25292e;
  }

  /* @media (prefers-color-scheme: dark) {
    :root {
      --background-color: #333333;
      --primary-color: #c3adff;
      --text-color: rgba(255, 255, 255, 0.8);
      --h1-h2-border-bottom-color: rgba(255, 255, 255, 0.17);
      --h6-color: rgba(255, 255, 255, 0.53);
      --blockquote-color: rgba(255, 255, 255, 0.53);
      --blockquote-border-left-color: rgba(255, 255, 255, 0.53);
      --icon-github-color: #fff;
    }
  } */

  body {
    background-color: var(--background-color);
  }

  h1,
  h2 {
    border-bottom: 1px solid var(--h1-h2-border-bottom-color);
  }

  h6 {
    color: var(--h6-color);
  }

  blockquote {
    color: var(--blockquote-color);
    border-left: 4px solid var(--blockquote-border-left-color);
  }

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
      letter-spacing: 1rem;
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
