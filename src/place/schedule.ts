import type { TimezoneName } from 'countries-and-timezones'
import { getDateTimeFormatter } from '../util/datetime'

export type Schedule = 'inOffice' | 'outOfOffice' | 'sleep'

export const SCHEDULE = {
  inOffice: {
    start: 9,
    end: 17,
  },
  outOfOffice: {
    morning: { start: 6, end: 9 },
    night: { start: 17, end: 21 },
  },
  sleep: {
    morning: { start: 0, end: 6 },
    night: { start: 21, end: 24 },
  },
}

export function getSchedule(time: Date, timezone: TimezoneName): Schedule | null {
  const timezoneFormatter24 = getDateTimeFormatter(timezone, { hour12: false })
  const timeParts = timezoneFormatter24.formatToParts(time)
  const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null

  if (!timezoneHour)
    return null

  const hour = Number(timezoneHour)

  if (false
    || (hour >= SCHEDULE.outOfOffice.morning.start && hour < SCHEDULE.outOfOffice.morning.end)
    || (hour >= SCHEDULE.outOfOffice.night.start && hour < SCHEDULE.outOfOffice.night.end)
  ) {
    return 'outOfOffice'
  }

  if (hour >= SCHEDULE.inOffice.start && hour < SCHEDULE.inOffice.end)
    return 'inOffice'

  return 'sleep'
}
