import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import AnimatedArrow from "./AnimatedArrow"

import { rhythm, scale } from "../utils/typography"

const readMoreStyle = css`
  margin-top: ${rhythm(1)};
  text-decoration: none !important;
  ${scale(0.1)}
`

const ReadMore = ({ children }) => {
  return (
    <Link css={readMoreStyle} to="/blog">
      <AnimatedArrow right>{children}</AnimatedArrow>
    </Link>
  )
}

export default ReadMore
