import React from "react"
import styled from "@emotion/styled"

import { primaryColor, textColor } from "../utils/colors"

const TitleMain = styled.span`
  color: ${primaryColor};
`
const TitleSecondary = styled.span`
  color: ${textColor};
`

const Logo = () => {
  return (
    <>
      <TitleMain>Out</TitleMain>
      <TitleSecondary>Of</TitleSecondary>
      <TitleMain>Memory</TitleMain>
    </>
  )
}

export default Logo
