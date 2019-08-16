import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import { rhythm } from "../utils/typography"

const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)} 0;
`

const Title = styled.h2`
  margin-top: 0;
`

const Layout = ({ title, children }) => {
  return (
    <LayoutWrapper>
      {title && (
        <header>
          <Title>
            <Link
              style={{
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/blog`}
            >
              {title}
            </Link>
          </Title>
        </header>
      )}
      {children}
    </LayoutWrapper>
  )
}

export default Layout
