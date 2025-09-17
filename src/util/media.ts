import { useCallback, useMemo, useSyncExternalStore } from 'react'

type Callback = () => void

export function useMedia(query: string): boolean {
  const media = useMemo(() => {
    return window.matchMedia(query)
  }, [query])

  const getSnapshot = useCallback((): boolean => {
    return media.matches
  }, [media])

  const subscribe = useCallback((callback: Callback): Callback => {
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
  }, [media])

  const matches = useSyncExternalStore(subscribe, getSnapshot)
  return matches
}
