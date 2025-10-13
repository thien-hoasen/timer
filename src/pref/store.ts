import type { ThemePref } from '../theme/pref'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { themePrefInitial } from '../theme/pref'

interface PrefState extends ThemePref {}

const persisted = persist<PrefState>(
  () => ({
    ...themePrefInitial,
  }),
  {
    name: 'pref',
    version: 2,
  },
)

export const usePref = create<PrefState>()(persisted)
