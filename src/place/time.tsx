import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { getSchedule, SCHEDULE } from '../time/schedule'
import { getDateTimeFormatter } from '../util/datetime'

export function PlaceTime(props: {
  time: Date
  timezone: TimezoneName
}): ReactElement | null {
  const { time, timezone } = props

  const timezoneFormatter = getDateTimeFormatter(timezone)
  const schedule = getSchedule(time, timezone)

  if (!schedule)
    return null

  return (
    <div
      className="py-8 px-16 rounded-full font-medium text-sm tabular-nums"
      style={{
        backgroundColor: SCHEDULE[schedule].backgroundColor,
        color: SCHEDULE[schedule].textColor,
      }}
    >
      {timezoneFormatter.format(time)}
    </div>
  )
}
