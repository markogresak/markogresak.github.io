import React from "react"
import styled from "@emotion/styled"

import { primaryColor, textColor } from "../utils/colors"

const FONT_SIZE = 32
const FONT_SIZE_SMALL = 12
const LETTER_APPEAR_DELAY = 0.1

const letters = [
  { letter: "O", color: primaryColor, visible: true },
  { letter: "u", color: primaryColor, visible: false },
  { letter: "t", color: primaryColor, visible: false },
  { letter: "O", color: textColor, visible: true },
  { letter: "f", color: textColor, visible: false },
  { letter: "M", color: primaryColor, visible: false },
  { letter: "e", color: primaryColor, visible: false },
  { letter: "m", color: primaryColor, visible: false },
  { letter: "o", color: primaryColor, visible: false },
  { letter: "r", color: primaryColor, visible: false },
  { letter: "y", color: primaryColor, visible: false },
].map((letter, i) => ({
  ...letter,
  index: i + 1,
}))

const getAnimatedLetters = () => letters.filter(({ visible }) => !visible)

const Container = styled.span`
  font-weight: 600;
`

const Letter = styled.span`
  color: ${({ color }) => color};
  font-size: ${({ visible }) => (visible ? FONT_SIZE : FONT_SIZE_SMALL)}px;
  transition: font-size ${round(LETTER_APPEAR_DELAY * 3)}s;

  ${getAnimatedLetters().map(
    ({ index }, i) => `
      &:nth-of-type(${letters.length - index}) {
        transition-delay: ${getDelay(i)}s;
      }
    `
  )};

  ${Container}:hover & {
    font-size: ${FONT_SIZE}px;

    ${getAnimatedLetters().map(
      ({ index }, i) => `
        &:nth-of-type(${index}) {
          transition-delay: ${getDelay(i)}s;
        }
      `
    )};
  }
`

function getDelay(i) {
  return i === 0 ? 0 : round(Math.log(i ** 3) * LETTER_APPEAR_DELAY)
}

function round(n) {
  // using `round(x*1e4)/1e4` to round to 4 decimal places
  return Math.round(n * 1e4) / 1e4
}

const Logo = () => {
  return (
    <Container>
      {letters.map(({ letter, color, visible, index }) => (
        <Letter key={index} color={color} visible={visible}>
          {letter}
        </Letter>
      ))}
    </Container>
  )
}

export default Logo
