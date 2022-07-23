import React from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

const isRenderingOnServer = typeof window === 'undefined'

export const getInitialState = (): boolean => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(getInitialState)
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches)
    }
    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [])
  return prefersReducedMotion
}
