import 'react-toggle/style.css'

import React, { useState, useCallback, useEffect } from 'react'
import Toggle from 'react-toggle'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { rhythm } from '../utils/typography'
import {
  bgColor,
  bgLightColor,
  bgDarkColor,
  textColor,
  textLightColor,
  textDarkColor,
} from '../utils/colors'

const Label = styled.label`
  position: absolute;
  top: ${rhythm(0.5)};
  right: ${rhythm(0.5)};

  .react-toggle-track {
    background-color: ${bgDarkColor} !important;
    color: ${textDarkColor} !important;
  }

  .react-toggle--checked .react-toggle-track {
    background-color: ${bgLightColor} !important;
    color: ${textLightColor} !important;
  }

  .react-toggle-track-check,
  .react-toggle-track-x {
    height: 100%;
  }

  .react-toggle-thumb {
    border-color: ${textColor};
    background-color: ${bgColor};
  }
`

function createMediaQuery() {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function'
  ) {
    return window.matchMedia('(prefers-color-scheme: dark)')
  }
  // Return a mock MediaQueryList
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }
}

const ColorModeToggle = () => {
  const prefersDarkModeMediaQuery = createMediaQuery()
  const [checked, setChecked] = useState(prefersDarkModeMediaQuery.matches)

  const handleMediaQueryChange = useCallback((event) => {
    setChecked(event.matches)
  })

  const handleCheckedChange = useCallback((event) => {
    setChecked(event.target.checked)
  })

  useEffect(() => {
    prefersDarkModeMediaQuery.addListener(handleMediaQueryChange)

    return () =>
      prefersDarkModeMediaQuery.removeListener(handleMediaQueryChange)
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', checked)
    document.documentElement.classList.toggle('light', !checked)
  }, [checked])

  return (
    <Label>
      <Toggle
        checked={checked}
        onChange={handleCheckedChange}
        aria-label={`Switch to ${checked ? 'light' : 'dark'} mode`}
        icons={{
          checked: (
            <FontAwesomeIcon
              icon="sun"
              style={{ height: '100%', width: '0.9em' }}
            />
          ),
          unchecked: (
            <FontAwesomeIcon
              icon="moon"
              style={{ height: '100%', width: '0.8em' }}
            />
          ),
        }}
      />
    </Label>
  )
}

export default ColorModeToggle
