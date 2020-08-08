import React from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'

import { rhythm, scale } from '../utils/typography'
import { rootStyle, lightStyle, darkStyle, primaryColor } from '../utils/colors'

import SEO from './SEO'
import ColorMode from './ColorMode'

const globalStyles = css`
  ${rootStyle};

  ${lightStyle};

  .dark {
    ${darkStyle};
  }

  .light {
    ${lightStyle};
  }

  body {
    background-color: var(--bg);
    /* TODO: fix transition flash on theme change */
    /* transition: background-color 0.3s, color 0.3s; */
  }

  h1,
  h2 {
    border-bottom: 1px solid var(--title-line);
  }

  h6 {
    color: var(--fg--h6);
  }

  blockquote {
    color: var(--fg--quote);
    border-left: 4px solid var(--quote-line);
  }

  a {
    color: ${primaryColor};
    text-decoration: none;
    transition: box-shadow 0.2s, color 0.3s;

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
      <ColorMode />
      <Layout className={className}>{children}</Layout>
    </>
  )
}

export default Page
