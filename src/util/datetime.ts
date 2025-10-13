import type { Timezone, TimezoneName } from 'countries-and-timezones'
import { getAllTimezones, getCountry, getTimezone } from 'countries-and-timezones'

export function getDateTimeFormatter(
  timezone?: string,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat('default', {
    timeZone: timezone,
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  })
}

// Local timezone should be always defined
// In case it is not found, throw error immediately

const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
export const LOCAL_TIMEZONE = getTimezone(localTimezone)
export const LOCAL_TIMEZONE_DATA = LOCAL_TIMEZONE ? getTimezoneWithCountry(LOCAL_TIMEZONE) : null

export const OTHER_TIMEZONES_DATA = Object.entries(getAllTimezones())
  .filter(([tz]) => tz !== LOCAL_TIMEZONE?.name)
  .map(([_, timezone]) => getTimezoneWithCountry(timezone))

export function formatTimezoneName(timezone: string): string {
  return timezone.split('/').pop()?.replaceAll('_', ' ') ?? ''
}

export interface TimezoneWithCountry {
  id: TimezoneName
  timezoneName: string
  countryName: string
  flagEmoji: string
}

export function getTimezoneWithCountry(timezone: Timezone): TimezoneWithCountry {
  if (timezone.countries.length === 0) {
    return {
      id: timezone.name as TimezoneName,
      timezoneName: formatTimezoneName(timezone.name),
      countryName: '',
      flagEmoji: '',
    }
  }
  return {
    id: timezone.name as TimezoneName,
    timezoneName: formatTimezoneName(timezone.name),
    countryName: getCountry(timezone.countries[0]).name,
    flagEmoji: getFlagEmoji(timezone.countries[0]),
  }
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
