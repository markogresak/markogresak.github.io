import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { rhythm } from "../utils/typography"

const ArrowIcon = styled.span`
  margin-left: ${({ right }) => (right ? rhythm(0.25) : 0)};
  margin-right: ${({ left }) => (left ? rhythm(0.25) : 0)};
  display: inline-block;
`

const Container = styled.div`
  &:hover ${ArrowIcon} {
    animation: arrow-pointing-right 0.5s 2;
  }

  @keyframes arrow-pointing-right {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(${({ left }) => rhythm(0.25 * (left ? -1 : 1))});
    }
    100% {
      transform: translateX(0);
    }
  }
`

const AnimatedArrow = ({ left, right, children, className }) => {
  if (!left && !right) {
    throw new Error("AnimatedArrow: Missing direction prop ('left' or 'right')")
  }

  return (
    <Container left={left} className={className}>
      {children}
      <ArrowIcon left={left} right={right}>
        {left && "←"}
        {right && "→"}
      </ArrowIcon>
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
