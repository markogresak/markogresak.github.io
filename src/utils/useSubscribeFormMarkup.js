import { useCallback, useState } from 'react'
import store from 'store/dist/store.modern'

const KEY = 'subscribe-form-markup-v2'

let cachedValue = ''

const getStoredValue = () => store.get(KEY, '') || cachedValue

const setStoredValue = (value) => {
  cachedValue = value
  try {
    // This can fail if there is no access (private browsing) or the store is full.
    // There's no way to recover, but use `cachedValue` as an in-memory fallback.
    store.set(KEY, value)
  } catch {}
}

export default function useSubscribeFormMarkup() {
  const [html, setHtml] = useState(getStoredValue)

  const updateHtml = useCallback((nextHtml) => {
    setHtml(nextHtml)
    setStoredValue(nextHtml)
  }, [])

  const fetchHtml = useCallback(() => {
    if (html) {
      return
    }

    // Optimization: check if `KEY` was added since initial mount (e.g. other tab)
    const storedHtml = getStoredValue()
    if (storedHtml) {
      updateHtml(storedHtml)
      return
    }

    import('../utils/subscribeFormMarkup').then((module) => {
      updateHtml(module.default)
    })
  }, [html, updateHtml])

  return [html, fetchHtml]
}
