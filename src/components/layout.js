import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import { rhythm } from "../utils/typography"

const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const Layout = ({ title, children }) => {
  return (
    <LayoutWrapper>
      {title && (
        <header>
          <h2 style={{ marginTop: 0 }}>
            <Link
              style={{
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h2>
        </header>
      )}
      {children}
    </LayoutWrapper>
  )
}

export default Layout
