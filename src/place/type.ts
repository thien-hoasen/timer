export interface Place {
  id: string
  timezone: string
  isPrimary: boolean
}

export const LOCAL_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
