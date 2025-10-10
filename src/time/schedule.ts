import type { TimezoneName } from 'countries-and-timezones'
import { getDateTimeFormatter } from '../util/datetime'

export type Schedule = 'inOffice' | 'outOfOffice' | 'sleep'

export const SCHEDULE = {
  inOffice: {
    start: 9,
    end: 17,
    backgroundColor: 'var(--color-accent-9)',
    textColor: 'var(--color-accent-4)',
    wheelColor: 'var(--color-accent-9)',
  },
  outOfOffice: {
    morning: { start: 6, end: 9 },
    night: { start: 17, end: 21 },
    backgroundColor: 'var(--color-accent-6)',
    textColor: 'var(--color-accent-11)',
    wheelColor: 'var(--color-accent-6)',
  },
  sleep: {
    morning: { start: 0, end: 6 },
    night: { start: 21, end: 24 },
    backgroundColor: 'var(--color-accent-4)',
    textColor: 'var(--color-accent-10)',
    wheelColor: 'var(--color-accent-4)',
  },
}

function hourToDegrees(hour: number): string {
  return `${(hour / 24) * 360}deg`
}

export function getWheelColors(): string[] {
  const sleepMorning = [
    SCHEDULE.sleep.wheelColor,
    hourToDegrees(SCHEDULE.sleep.morning.start),
    hourToDegrees(SCHEDULE.sleep.morning.end),
  ].join(' ')

  const outOfOfficeMorning = [
    SCHEDULE.outOfOffice.wheelColor,
    hourToDegrees(SCHEDULE.outOfOffice.morning.start),
    hourToDegrees(SCHEDULE.outOfOffice.morning.end),
  ].join(' ')

  const inOffice = [
    SCHEDULE.inOffice.wheelColor,
    hourToDegrees(SCHEDULE.inOffice.start),
    hourToDegrees(SCHEDULE.inOffice.end),
  ].join(' ')

  const outOfOfficeEvening = [
    SCHEDULE.outOfOffice.wheelColor,
    hourToDegrees(SCHEDULE.outOfOffice.night.start),
    hourToDegrees(SCHEDULE.outOfOffice.night.end),
  ].join(' ')

  const sleepEvening = [
    SCHEDULE.sleep.wheelColor,
    hourToDegrees(SCHEDULE.sleep.night.start),
    hourToDegrees(SCHEDULE.sleep.night.end),
  ].join(' ')

  return [
    sleepMorning,
    outOfOfficeMorning,
    inOffice,
    outOfOfficeEvening,
    sleepEvening,
  ]
}

export function getSchedule(time: Date, timezone: TimezoneName): Schedule | null {
  const timezoneFormatter24 = getDateTimeFormatter(timezone, { hour12: false })
  const timeParts = timezoneFormatter24.formatToParts(time)
  const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null

  if (!timezoneHour)
    return null

  if (false
    || (Number(timezoneHour) >= SCHEDULE.outOfOffice.morning.start && Number(timezoneHour) < SCHEDULE.outOfOffice.morning.end)
    || (Number(timezoneHour) >= SCHEDULE.outOfOffice.night.start && Number(timezoneHour) < SCHEDULE.outOfOffice.night.end)) {
    return 'outOfOffice'
  }

  if (Number(timezoneHour) >= SCHEDULE.inOffice.start && Number(timezoneHour) < SCHEDULE.inOffice.end)
    return 'inOffice'

  return 'sleep'
}
