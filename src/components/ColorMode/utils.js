const KEY = 'theme'

export const LIGHT = 'light'
export const DARK = 'dark'

export const getColorScheme = () =>
  typeof window !== 'undefined' &&
  window.localStorage &&
  window.localStorage.getItem(KEY)

export const setColorScheme = (isDarkMode) =>
  typeof window !== 'undefined' &&
  window.localStorage &&
  window.localStorage.setItem(KEY, isDarkMode ? DARK : LIGHT)

export function getMediaQuery() {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function'
  ) {
    return window.matchMedia('(prefers-color-scheme: dark)')
  }
}

export const setHtmlClassName = (isDarkMode) => {
  document.documentElement.classList.toggle(DARK, isDarkMode)
}
