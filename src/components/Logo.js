import React from "react"
import styled from "@emotion/styled"

import { scale } from "../utils/typography"
import { primaryColor, textColor } from "../utils/colors"

const Title = styled.span`
  ${scale(1)};
  font-weight: 600;
`

const TitleMain = styled.span`
  color: ${primaryColor};
`
const TitleSecondary = styled.span`
  color: ${textColor};
`

const Logo = () => {
  return (
    <Title>
      <TitleMain>Out</TitleMain>
      <TitleSecondary>Of</TitleSecondary>
      <TitleMain>Memory</TitleMain>
    </Title>
  )
}

export default Logo
