import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { rhythm } from "../utils/typography"

const getAnimationName = left => `arrow-${left ? "left" : "right"}`

const arrowPointingKeyframes = left => css`
  @keyframes ${getAnimationName(left)} {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(${rhythm(0.25 * (left ? -1 : 1))});
    }
    100% {
      transform: translateX(0);
    }
  }
`

const Container = styled.div``

const ArrowIcon = styled.span`
  margin-left: ${({ right }) => (right ? rhythm(0.25) : 0)};
  margin-right: ${({ left }) => (left ? rhythm(0.25) : 0)};
  display: inline-block;

  ${Container}:hover & {
    animation: ${({ left }) => getAnimationName(left)} 0.5s 2 both;
  }

  ${({ left }) => left && arrowPointingKeyframes(true)}
  ${({ right }) => right && arrowPointingKeyframes(false)}
`

const AnimatedArrow = ({ left, right, children, className }) => {
  if (!left && !right) {
    throw new Error("AnimatedArrow: Missing direction prop ('left' or 'right')")
  }
  if (left && right) {
    throw new Error(
      "AnimatedArrow: simultaneous 'left' and 'right' not supported"
    )
  }

  return (
    <Container className={className}>
      {left && <ArrowIcon left>←</ArrowIcon>}
      {children}
      {right && <ArrowIcon right>→</ArrowIcon>}
    </Container>
  )
}

AnimatedArrow.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default AnimatedArrow
