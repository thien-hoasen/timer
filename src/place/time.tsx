import type { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { getDateTimeFormatter } from '../util/datetime'

export function PlaceTime(props: {
  time: Date
  timezone: string
}): ReactElement | null {
  const { time, timezone } = props

  const timezoneFormatter = getDateTimeFormatter(timezone)
  const timezoneFormatter24 = getDateTimeFormatter(timezone, { hour12: false })
  const timeParts = timezoneFormatter24.formatToParts(time)
  const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null

  if (!timezoneHour)
    return null

  const isWeekend = time.getDay() === 0 || time.getDay() === 6

  return (
    <div
      className={twMerge(
        'py-8 px-16 rounded-full font-medium text-sm',
        // default color, do not disturb
        'bg-accent-10 text-accent-4',
        // out of office
        Number(timezoneHour) >= 5 && Number(timezoneHour) < 8
          ? 'bg-accent-4 text-accent-10'
          : '',
        // in office
        Number(timezoneHour) >= 8 && Number(timezoneHour) < 17
          ? 'bg-yellow-4 text-accent-10'
          : '',
        // out of office
        Number(timezoneHour) >= 17 && Number(timezoneHour) < 22
          ? 'bg-accent-4 text-accent-10'
          : '',
        // Weekend
        // default color, do not disturb
        isWeekend ? 'bg-danger-10 text-danger-4' : '',
        // out of office
        isWeekend && Number(timezoneHour) >= 5 && Number(timezoneHour) < 8
          ? 'bg-danger-6 text-danger-10'
          : '',
        isWeekend && Number(timezoneHour) >= 8 && Number(timezoneHour) < 17
          ? 'bg-danger-4 text-danger-10'
          : '',
        isWeekend && Number(timezoneHour) >= 17 && Number(timezoneHour) < 22
          ? 'bg-danger-6 text-danger-10'
          : '',
      )}
    >
      {timezoneFormatter.format(time)}
    </div>
  )
}
