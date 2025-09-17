import { useMedia } from './media'

// CSS variables cannot be used in media queries,
// so keep this in sync with our tailwind config
const BREAKPOINTS = {
  sm: 640,
  md: 960,
} as const

type Name = keyof typeof BREAKPOINTS

export function useBreakpoint(name: Name): boolean {
  const value = useMedia(`(min-width: ${BREAKPOINTS[name]}px)`)
  return value
}
