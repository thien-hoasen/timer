import type { ReactElement } from 'react'
import { getCountry, getTimezone } from 'countries-and-timezones'
import { Home } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'
import { getDateTimeFormatter } from '../util/datetime'
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

        const timezoneFormatter = getDateTimeFormatter(tz)
        const timeParts = timezoneFormatter.formatToParts(time)
        const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null
        const timezonePeriod = timeParts.find(part => part.type === 'dayPeriod')?.value ?? null
        if (!timezoneHour || !timezonePeriod)
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
              className={twMerge(
                'py-8 px-16 rounded-full font-medium text-sm',
                // default color
                'bg-accent-10 text-accent-4',
                // out of office
                timezonePeriod === 'AM' && Number(timezoneHour) >= 6
                  ? 'bg-accent-4 text-accent-10'
                  : '',
                // in office
                timezonePeriod === 'AM' && Number(timezoneHour) >= 8
                  ? 'bg-yellow-4 text-accent-10'
                  : '',
                // out of office
                timezonePeriod === 'PM' && Number(timezoneHour) >= 6
                  ? 'bg-accent-4 text-accent-10'
                  : '',
                // do not disturb
                timezonePeriod === 'PM' && Number(timezoneHour) >= 9
                  ? 'bg-yellow-4 text-accent-10'
                  : '',
              )}
            >
              {timezoneFormatter.format(time)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
