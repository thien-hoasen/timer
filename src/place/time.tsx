import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { getDateTimeFormatter } from '../util/datetime'

export function PlaceTime(props: {
  time: Date
  timezone: TimezoneName
}): ReactElement | null {
  const { time, timezone } = props

  const timezoneFormatter = getDateTimeFormatter(timezone)
  const timezoneFormatter24 = getDateTimeFormatter(timezone, { hour12: false })
  const timeParts = timezoneFormatter24.formatToParts(time)
  const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null

  if (!timezoneHour)
    return null

  const isOutOfOffice = false
    || (Number(timezoneHour) >= 5 && Number(timezoneHour) < 8)
    || (Number(timezoneHour) >= 17 && Number(timezoneHour) < 22)
  const isInOffice = Number(timezoneHour) >= 8 && Number(timezoneHour) < 17

  return (
    <div
      className={twMerge(
        'py-8 px-16 rounded-full font-medium text-sm',
        'bg-accent-12 text-accent-4',
        isOutOfOffice && 'bg-accent-10 text-accent-4',
        isInOffice && 'bg-accent-6 text-accent-10',
      )}
    >
      {timezoneFormatter.format(time)}
    </div>
  )
}
