import 'react-toggle/style.css'

import React, { useState, useCallback, useEffect, useMemo } from 'react'
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
import {
  setHtmlClassName,
  setColorScheme,
  getInitialState,
  getMediaQuery,
} from '../utils/colorScheme'

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

const ColorModeToggle = () => {
  const [checked, setChecked] = useState(getInitialState())
  const mediaQuery = useMemo(getMediaQuery, [])

  const handleStateChange = useCallback(
    (nextChecked) => {
      setChecked(nextChecked)
      setColorScheme(nextChecked)
    },
    [setColorScheme],
  )

  const handleMediaQueryChange = useCallback(
    (event) => handleStateChange(event.matches),
    [handleStateChange],
  )
  const handleCheckedChange = useCallback(
    (event) => handleStateChange(event.target.value),
    [handleStateChange],
  )

  useEffect(() => {
    mediaQuery.addListener(handleMediaQueryChange)
    return () => mediaQuery.removeListener(handleMediaQueryChange)
  }, [mediaQuery])

  useEffect(() => {
    setHtmlClassName(checked)
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
