import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import type { GuessColor } from '../wheel/render'
import { getDateTimeFormatter } from '../util/datetime'
import { getSchedule } from './schedule'

export function PlaceTime(props: {
  time: Date
  timezone: TimezoneName
  color: 'accent' | GuessColor
}): ReactElement | null {
  const { time, timezone, color } = props

  const schedule = getSchedule(time, timezone)
  if (!schedule)
    return null

  const timezoneFormatter = getDateTimeFormatter(timezone)

  const scheduleColor = {
    inOffice: {
      backgroundColor: `var(--${color}-9)`,
      textColor: `var(--${color}-4)`,
    },
    outOfOffice: {
      backgroundColor: `var(--${color}-6)`,
      textColor: `var(--${color}-11)`,
    },
    sleep: {
      backgroundColor: `var(--${color}-4)`,
      textColor: `var(--${color}-10)`,
    },
  }

  return (
    <div
      className="py-8 px-16 rounded-full font-medium text-sm tabular-nums"
      style={{
        backgroundColor: scheduleColor[schedule].backgroundColor,
        color: scheduleColor[schedule].textColor,
      }}
    >
      {timezoneFormatter.format(time)}
    </div>
  )
}
