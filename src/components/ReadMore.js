import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { rhythm, scale } from "../utils/typography"
import { primaryLightColor, primaryColor } from "../utils/colors"

const Icon = styled.span`
  margin-left: ${rhythm(0.25)};
  display: inline-block;
`

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

    ${Icon} {
      animation: arrow-pointing-right 0.5s 2;
    }
  }

  @keyframes arrow-pointing-right {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(${rhythm(0.25)});
    }
    100% {
      transform: translateX(0);
    }
  }
`

const ReadMore = ({ children }) => {
  return (
    <Link css={readMoreStyle} to="/blog">
      {children}
      <Icon>→</Icon>
    </Link>
  )
}

export default ReadMore
