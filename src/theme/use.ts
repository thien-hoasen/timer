import { useEffect } from 'react'
import { usePref } from '../pref/store'
import { useMedia } from '../util/media'

const list = document.documentElement.classList

export function useTheme(): void {
  const theme = usePref(state => state.theme)

  const prefersDark = useMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    const force = theme === 'system' ? prefersDark : theme === 'dark'
    list.toggle('dark', force)
  }, [theme, prefersDark])
}
