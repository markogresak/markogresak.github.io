import React from "react"
import { css, Global } from "@emotion/core"

import SEO from "./seo"

const globalStyles = css`
  a {
    color: "#3d00e0";
  }

  hr {
    background: "none";

    &:before {
      content: "...";
      letter-spacing: "0.6em";
    }
  }
```

const Page = ({ children, title, description }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <SEO title={title} description={description} />
      {children}
    </>
  )
}

export default Page
