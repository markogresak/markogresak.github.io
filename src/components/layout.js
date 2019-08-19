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

const Title = styled.h2`
  margin-top: 0;
`

const Layout = ({ title, children, linkTo, className }) => {
  return (
    <LayoutWrapper className={className}>
      {title && (
        <header>
          <Title>
            {linkTo ? (
              <Link
                style={{
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={linkTo}
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </Title>
        </header>
      )}
      {children}
    </LayoutWrapper>
  )
}

export default Layout
