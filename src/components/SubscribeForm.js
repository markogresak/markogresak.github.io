import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import { rhythm } from '../utils/typography'
import { primaryColor, bgColor } from '../utils/colors'

const FromContainer = styled.div`
  margin-top: ${rhythm(1)};

  a {
    box-shadow: none !important;
  }

  .formkit-submit {
    background: ${primaryColor} !important;
    color: ${bgColor} !important;
  }
`

const SubscribeForm = () => {
  const [html, setHtml] = useState('')

  useEffect(() => {
    import('../utils/subscribeFormMarkup').then((module) => {
      setHtml(module.default)
    })
  })

  return html && <FromContainer dangerouslySetInnerHTML={{ __html: html }} />
}

export default SubscribeForm
