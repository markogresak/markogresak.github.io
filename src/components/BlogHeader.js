import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import Logo from "../components/Logo"

import { rhythm } from "../utils/typography"

const HeaderLogo = styled.h2`
  margin-top: 0;
  margin-bottom: ${rhythm(2)};
  border-bottom: none;
`

const BlogHeader = ({ children }) => {
  return (
    <header>
      <HeaderLogo>
        <Link to="/blog">
          <Logo />
        </Link>
      </HeaderLogo>
      {children}
    </header>
  )
}

export default BlogHeader
