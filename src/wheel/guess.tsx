import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import type { GuessColor } from './render'
import { getTimezone } from 'countries-and-timezones'
import { twJoin } from 'tailwind-merge'
import { LOCAL_TIMEZONE } from '../util/datetime'
import { getWheelColors, GUESS_WHEEL_THICKNESS, hourToDegrees } from './render'

export function WheelGuess(props: {
  diameter: number
  color: GuessColor
  timezone: TimezoneName
}): ReactElement | null {
  const { diameter, color, timezone } = props

  if (!LOCAL_TIMEZONE)
    throw new Error('Local timezone is not found')

  const timezoneData = getTimezone(timezone)
  if (!timezoneData)
    return null

  const wheelColors = getWheelColors(color).join(',')
  const offSetHours = (timezoneData.utcOffset - LOCAL_TIMEZONE.utcOffset) / 60

  return (
    <div
      className={twJoin(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'rounded-half flex items-center justify-center',
      )}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        background: `conic-gradient(${wheelColors})`,
        rotate: hourToDegrees(offSetHours),
      }}
    >
      <div
        className="bg-gray-1 rounded-half"
        style={{
          width: `${diameter - GUESS_WHEEL_THICKNESS}px`,
          height: `${diameter - GUESS_WHEEL_THICKNESS}px`,
        }}
      />
    </div>
  )
}
