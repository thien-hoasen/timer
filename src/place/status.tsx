import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { AlertTriangle, BellOff, CheckCheck } from 'lucide-react'
import { LOCAL_TIMEZONE } from '../util/datetime'
import { getSchedule } from './schedule'

export function PlaceStatus(props: {
  time: Date
  timezone: TimezoneName
}): ReactElement | null {
  const { time, timezone } = props

  if (!LOCAL_TIMEZONE || timezone === LOCAL_TIMEZONE.name)
    return null

  const schedule = getSchedule(time, timezone)

  if (schedule === 'outOfOffice') {
    return (
      <AlertTriangle
        size={20}
        fill="var(--accent-4)"
        color="var(--accent-10)"
      />
    )
  }

  if (schedule === 'inOffice') {
    return (
      <CheckCheck
        size={20}
        color="var(--accent-10)"
      />
    )
  }

  return (
    <BellOff
      size={20}
      fill="var(--accent-10)"
      color="var(--accent-10)"
    />
  )
}
