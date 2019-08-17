import React from "react"
import styled from "@emotion/styled"

import { primaryColor, textColor } from "../utils/colors"

const Container = styled.span`
  display: inline-flex;
  align-items: center;
`

const TitleMain = styled.span`
  color: ${primaryColor};
`
const TitleSecondary = styled.span`
  color: ${textColor};
`

const Logo = () => {
  return (
    <Container>
      <TitleMain>Out</TitleMain>
      <TitleSecondary>Of</TitleSecondary>
      <TitleMain>Memory</TitleMain>
    </Container>
  )
}

export default Logo
