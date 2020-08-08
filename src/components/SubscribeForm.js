import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import useIsInViewport from 'use-is-in-viewport'

import { rhythm } from '../utils/typography'
import { primaryColor, bgColor, textColor } from '../utils/colors'

const FromContainer = styled.div`
  margin-top: ${rhythm(1)};

  a {
    box-shadow: none !important;
  }

  .formkit-input,
  .formkit-submit {
    background: ${bgColor} !important;
    color: ${textColor} !important;
    border: 1px solid ${textColor} !important;
    line-height: 1;
    transition: color, border-color 0.2s;
  }

  .formkit-input {
    &:focus {
      border-color: ${primaryColor} !important;
    }
  }

  .formkit-submit {
    &:hover,
    &:focus {
      color: ${primaryColor} !important;
      border-color: ${primaryColor} !important;
    }

    span {
      background: ${bgColor} !important;
    }
  }
`

const SubscribeForm = () => {
  const [isInViewport, containerRef] = useIsInViewport()
  const [html, setHtml] = useState('')

  useEffect(() => {
    if (isInViewport && !html) {
      import('../utils/subscribeFormMarkup').then((module) => {
        setHtml(module.default)
      })
    }
  }, [isInViewport, html])

  return (
    <div ref={containerRef}>
      {html && <FromContainer dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  )
}

export default SubscribeForm
