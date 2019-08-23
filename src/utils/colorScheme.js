const KEY = 'theme'

export const LIGHT = 'light'
export const DARK = 'dark'

const getClassName = (isDarkMode) => (isDarkMode ? DARK : LIGHT)

export const getColorScheme = () =>
  typeof window !== 'undefined' &&
  window.localStorage &&
  window.localStorage.getItem(KEY)

export const setColorScheme = (isDarkMode) =>
  typeof window !== 'undefined' &&
  window.localStorage &&
  window.localStorage.setItem(KEY, getClassName(isDarkMode))

export function getMediaQuery() {
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

export const setHtmlClassName = (isDarkMode) => {
  document.documentElement.classList.toggle(LIGHT, !isDarkMode)
  document.documentElement.classList.toggle(DARK, isDarkMode)
}

export const getInitialState = () =>
  getColorScheme() ? getColorScheme() === DARK : getMediaQuery().matches
