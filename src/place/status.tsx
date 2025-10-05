import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { AlertTriangle, BellOff, CheckCheck } from 'lucide-react'
import { getDateTimeFormatter } from '../util/datetime'
import { LOCAL_TIMEZONE } from './type'

export function PlaceStatus(props: { time: Date, timezone: TimezoneName }): ReactElement | null {
  const { time, timezone } = props

  if (timezone === LOCAL_TIMEZONE)
    return null

  const timezoneFormatter24 = getDateTimeFormatter(timezone, { hour12: false })
  const timeParts = timezoneFormatter24.formatToParts(time)
  const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null

  if (!timezoneHour) {
    return (
      <BellOff
        size={20}
        fill="var(--color-accent-10)"
        color="var(--color-accent-10)"
      />
    )
  }

  const isOutOfOffice = false
    || (Number(timezoneHour) >= 5 && Number(timezoneHour) < 8)
    || (Number(timezoneHour) >= 17 && Number(timezoneHour) < 22)
  const isInOffice = Number(timezoneHour) >= 8 && Number(timezoneHour) < 17

  if (isOutOfOffice) {
    return (
      <AlertTriangle
        size={20}
        fill="var(--color-accent-4)"
        color="var(--color-accent-10)"
      />
    )
  }

  if (isInOffice) {
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
