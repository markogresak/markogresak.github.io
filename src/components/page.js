import React from "react"
import { css, Global } from "@emotion/core"

import typography, { scale } from "../utils/typography"
import { primaryColor, complementaryColor } from "../utils/colors"

import SEO from "./Seo"

const globalStyles = css`
  a {
    color: ${primaryColor};
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
`

const Page = ({ children, title, description }) => {
  return (
    <>
      <SEO title={title} description={description} />
      <Global styles={globalStyles} />
      {children}
    </>
  )
}

export default Page
