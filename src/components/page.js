import React from "react"
import { css, Global } from "@emotion/core"
import styled from "@emotion/styled"

import typography, { rhythm, scale } from "../utils/typography"
import { primaryColor } from "../utils/colors"

import SEO from "./Seo"

const globalStyles = css`
  a {
    color: ${primaryColor};
    display: inline-block;

    /* Custom link underline (Adapted from Emotion docs) */
    &:after {
      content: "";
      display: block;
      width: 100%;
      margin-top: 0.1em;
      height: 0.1em;
      transition: transform 0.3s cubic-bezier(1, 0.035, 0.6, 1.175);
      transition: transform 0.5s cubic-bezier(1, 0.005, 0.265, 1.55);
      transform: scaleX(0);
      background: ${primaryColor};
    }

    &:hover {
      text-decoration: none;

      &:after {
        transform: scaleX(1);
      }
    }
  }

  hr {
    background: none;
    text-align: center;
    margin: 0;
    height: 3rem;

    &:before {
      color: ${primaryColor};
      content: "...";
      letter-spacing: ${typography.options.baseFontSize};
      ${scale(1.5)};
      line-height: 0;
    }
  }

  :not(pre) > code[class*="language-"] {
    white-space: normal;
  }
`

const Layout = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
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
