import type { TimezoneName } from 'countries-and-timezones'

export interface Place {
  id: string
  timezone: string
  isPrimary: boolean
}

export const LOCAL_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone as TimezoneName
