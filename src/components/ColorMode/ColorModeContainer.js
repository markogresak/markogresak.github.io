import React, { useCallback, useEffect, useState } from 'react'

import { DARK, setHtmlClassName, setColorScheme, getColorScheme } from './utils'
import ColorModeToggle from './ColorModeToggle'

/**
 * @returns {boolean}
 */
const getInitialIsDarkMode = (mediaQuery) => {
  const colorScheme = getColorScheme()
  return colorScheme
    ? colorScheme === DARK
    : Boolean(mediaQuery && mediaQuery.matches)
}

const ColorModeContainer = ({ mediaQuery }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialIsDarkMode(mediaQuery))

  const handleStateChange = useCallback((nextIsDarkMode) => {
    setIsDarkMode(nextIsDarkMode)
    setColorScheme(nextIsDarkMode)
  }, [])

  const handleMediaQueryChange = useCallback(
    (event) => handleStateChange(event.matches),
    [handleStateChange],
  )

  useEffect(() => {
    mediaQuery.addListener(handleMediaQueryChange)
    return () => mediaQuery.removeListener(handleMediaQueryChange)
  }, [mediaQuery, handleMediaQueryChange])

  useEffect(() => {
    setHtmlClassName(isDarkMode)
  }, [isDarkMode])

  return <ColorModeToggle checked={isDarkMode} onChange={handleStateChange} />
}

export default ColorModeContainer
