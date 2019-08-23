import { getInitialState, setHtmlClassName } from './src/utils/colorScheme'

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(() => {
  setHtmlClassName(getInitialState())
})
