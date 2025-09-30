export interface Place {
  id: string
  timezone: string
  isPrimary: boolean
}

export const MOCK_TIMEZONES: string[] = [
  'America/New_York',
  'Asia/Ho_Chi_Minh',
  'Asia/Tokyo',
  'Europe/London',
  'Europe/Rome',
  'Europe/Paris',
]

export const LOCAL_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
