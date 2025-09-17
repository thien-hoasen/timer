export type Theme = 'light' | 'dark' | 'system'

export interface ThemePref {
  theme: Theme
}

export const themePrefInitial: ThemePref = {
  theme: 'system',
}
