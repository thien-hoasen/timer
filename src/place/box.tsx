import type { ReactElement } from 'react'
import { getCountry, getTimezone } from 'countries-and-timezones'
import { Home } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { getDateTimeFormat } from '../util/datetime'
import { MOCK_TIMEZONES } from './type'

const LOCAL_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

export function PlaceBox(props: {
  time: Date
}): ReactElement {
  const { time } = props

  return (
    <div
      className={twJoin(
        'flex-1 flex flex-col px-16 overflow-auto',
        'bg-gray-1 rounded-8 font-medium',
      )}
    >
      {[
        LOCAL_TIMEZONE,
        ...MOCK_TIMEZONES.filter(tz => tz !== LOCAL_TIMEZONE),
      ].map((tz, index) => {
        const timezone = getTimezone(tz)
        if (!timezone || timezone.countries.length === 0)
          return null

        const country = getCountry(timezone.countries[0])
        if (!country)
          return null

        return (
          <div
            key={tz}
            className={twJoin(
              'h-full flex justify-between items-center gap-16 py-16',
              index !== MOCK_TIMEZONES.length - 1 && 'border-b border-gray-3',
            )}
          >
            <Home
              size={20}
              fill={index === 0
                ? 'var(--color-accent-10)'
                : 'var(--color-gray-10)'}
              color={index === 0
                ? 'var(--color-accent-10)'
                : 'var(--color-gray-10)'}
            />
            <div className="flex-1 flex flex-col">
              <div className="font-medium">
                {tz.split('/').pop()?.replaceAll('_', ' ')}
              </div>
              <div className="text-xs font-light text-gray-10">
                {country.name}
              </div>
            </div>
            <div
              className={twJoin(
                'bg-accent-4 py-8 px-16 rounded-full',
                'font-medium text-sm text-accent-10',
              )}
            >
              {getDateTimeFormat(tz).format(time)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
