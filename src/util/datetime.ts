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

export function getTimezoneName(timezone: string): string {
  return timezone.split('/').pop()?.replaceAll('_', ' ') ?? ''
}

export const LOCAL_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone as TimezoneName

export const LOCAL_TIMEZONE_DATA = getTimezoneAndCountry(getTimezone(LOCAL_TIMEZONE))

export const ALL_TIMEZONES = getAllTimezones()

export const ALL_TIMEZONES_DATA = Object.values(ALL_TIMEZONES)
  .filter(tz => tz.name !== LOCAL_TIMEZONE)
  .map(getTimezoneAndCountry)

function getTimezoneAndCountry(timezone: Timezone) {
  if (timezone.countries.length === 0) {
    return {
      id: timezone.name as TimezoneName,
      timezone: getTimezoneName(timezone.name),
      country: '',
      flag: '',
    }
  }
  return {
    id: timezone.name as TimezoneName,
    timezone: getTimezoneName(timezone.name),
    country: getCountry(timezone.countries[0]).name,
    flag: getFlagEmoji(timezone.countries[0]),
  }
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
