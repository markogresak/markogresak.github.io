import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { rhythm } from '../utils/typography'

const REACTIONS_CONTAINER_ID = 'reactions'

const ReactionsContainer = styled.div`
  display: ${({ isLoaded }) => (isLoaded ? 'flex' : 'none')};
  justify-content: center;
  margin-top: ${rhythm(1)};
`

const Reactions = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://d30el1c1kbdu9w.cloudfront.net/embed.js'
    script.addEventListener('load', () => {
      window.Reactions({
        site: '06f94754-9bfd-4b41-a49e-53a1ef97a537',
        container: document.getElementById(REACTIONS_CONTAINER_ID),
      })
      setIsLoaded(true)
    })
    document.body.appendChild(script)
  }, [])

  return <ReactionsContainer id={REACTIONS_CONTAINER_ID} isLoaded={isLoaded} />
}

export default Reactions
