import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { getDateTimeFormatter } from '../util/datetime'
import { SCHEDULE } from './schedule'

export function PlaceStatus(props: {
  time: Date
  timezone: TimezoneName
}): ReactElement | null {
  const { time, timezone } = props

  const scheduleEmoji = getScheduleEmoji(time, timezone)
  if (!scheduleEmoji)
    return null

  return (
    <div className="text-3xl sm:text-4xl lg:text-5xl">
      {scheduleEmoji}
    </div>
  )
}

function getScheduleEmoji(time: Date, timezone: TimezoneName): string | null {
  const timezoneFormatter24 = getDateTimeFormatter(timezone, { hour12: false })
  const timeParts = timezoneFormatter24.formatToParts(time)
  const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null

  if (!timezoneHour)
    return null

  const hour = Number(timezoneHour)

  if (hour >= SCHEDULE.sleep.morning.start && hour < SCHEDULE.sleep.morning.end)
    return SCHEDULE.sleep.morning.emoji

  if (hour >= SCHEDULE.outOfOffice.morning.start && hour < SCHEDULE.outOfOffice.morning.end)
    return SCHEDULE.outOfOffice.morning.emoji

  if (hour >= SCHEDULE.inOffice.start && hour < SCHEDULE.inOffice.end)
    return SCHEDULE.inOffice.emoji

  if (hour >= SCHEDULE.outOfOffice.night.start && hour < SCHEDULE.outOfOffice.night.end)
    return SCHEDULE.outOfOffice.night.emoji

  if (hour >= SCHEDULE.sleep.night.start && hour < SCHEDULE.sleep.night.end)
    return SCHEDULE.sleep.night.emoji

  return null
}
