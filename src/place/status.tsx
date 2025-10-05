import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { AlertTriangle, BellOff, CheckCheck } from 'lucide-react'
import { getSchedule } from '../time/schedule'
import { LOCAL_TIMEZONE } from './type'

export function PlaceStatus(props: { time: Date, timezone: TimezoneName }): ReactElement | null {
  const { time, timezone } = props

  if (timezone === LOCAL_TIMEZONE)
    return null

  const schedule = getSchedule(time, timezone)

  if (schedule === 'outOfOffice') {
    return (
      <AlertTriangle
        size={20}
        fill="var(--color-accent-4)"
        color="var(--color-accent-10)"
      />
    )
  }

  if (schedule === 'inOffice') {
    return (
      <CheckCheck
        size={20}
        color="var(--color-accent-10)"
      />
    )
  }

  return (
    <BellOff
      size={20}
      fill="var(--color-accent-10)"
      color="var(--color-accent-10)"
    />
  )
}
