import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { scale } from "../utils/typography"
import { primaryColor, textColor } from "../utils/colors"

const LETTER_APPEAR_DELAY = 0.1

const letters = [
  { letter: "O", color: primaryColor, visible: true },
  { letter: "u", color: primaryColor, visible: false },
  { letter: "t", color: primaryColor, visible: false },
  { letter: "O", color: textColor, visible: true, fixPosition: true },
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
  ${scale(1)};
  line-height: 1;
  font-weight: 600;
`

const Letter = styled.span`
  color: ${({ color }) => color};
  display: inline-block;
  transform: scale(${({ visible }) => (visible ? 1 : 0)});
  transition: transform ${round(LETTER_APPEAR_DELAY * 2)}s ease-out;
  will-change: transform;

  ${getAnimatedLetters().map(
    ({ index }, i) => `
      &:nth-last-of-type(${index}) {
        transition-delay: ${getDelay(i)}s;
      }
    `
  )};

  ${Container}:hover & {
    transform: scale(1);

    ${getAnimatedLetters().map(
      ({ index }, i) => `
        &:nth-of-type(${index}) {
          transition-delay: ${getDelay(i)}s;
        }
      `
    )};
  }
`

const fixedPositionStyle = css`
  transform: translateX(-1.7ch);
  transition-delay: ${getDelay(letters.length - 2)}s !important;

  ${Container}:hover & {
    transform: translateX(0);
    transition-delay: 0s !important;
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
      {letters.map(({ letter, color, visible, index, fixPosition }) => (
        <Letter
          key={index}
          color={color}
          visible={visible}
          css={fixPosition && fixedPositionStyle}
        >
          {letter}
        </Letter>
      ))}
    </Container>
  )
}

export default Logo
