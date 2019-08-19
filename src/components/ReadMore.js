import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import AnimatedArrow from "./AnimatedArrow"

import { rhythm, scale } from "../utils/typography"
import { primaryLightColor, primaryColor } from "../utils/colors"

const readMoreStyle = css`
  display: block;
  margin-top: ${rhythm(1)};
  text-decoration: none !important;
  font-weight: 500;
  ${scale(0.1)}
  transition: color 0.2s;
  color: ${primaryLightColor};

  &:hover {
    color: ${primaryColor};
  }
`

const ReadMore = ({ children }) => {
  return (
    <Link css={readMoreStyle} to="/blog">
      <AnimatedArrow right>{children}</AnimatedArrow>
    </Link>
  )
}

export default ReadMore
