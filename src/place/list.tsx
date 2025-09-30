import type { ReactElement } from 'react'
import { getCountry, getTimezone } from 'countries-and-timezones'
import { Home, X } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'
import { getDateTimeFormatter } from '../util/datetime'
import { LOCAL_TIMEZONE } from './type'

export function PlaceList(props: {
  time: Date
  timezones: string[]
  setTimezones: (timezones: string[]) => void
}): ReactElement {
  const { time, timezones, setTimezones } = props

  return (
    <>
      {/* Make sure the local timezone is always at the top and we don't show it twice */}
      {[
        LOCAL_TIMEZONE,
        ...timezones.filter(tz => tz !== LOCAL_TIMEZONE),
      ].map((tz, index) => {
        const timezone = getTimezone(tz)
        if (!timezone || timezone.countries.length === 0)
          return null

        const country = getCountry(timezone.countries[0])
        if (!country)
          return null

        const timezoneFormatter = getDateTimeFormatter(tz)
        const timezoneFormatter24 = getDateTimeFormatter(tz, { hour12: false })
        const timeParts = timezoneFormatter24.formatToParts(time)
        const timezoneHour = timeParts.find(part => part.type === 'hour')?.value ?? null
        if (!timezoneHour)
          return null

        return (
          <div
            key={tz}
            className={twJoin(
              'h-max flex justify-between items-center gap-16 py-16',
              'border-b border-gray-3',
            )}
          >
            {index === 0
              ? (
                  <button type="button">
                    <Home
                      size={20}
                      fill="var(--color-accent-10)"
                      color="var(--color-accent-10)"
                    />
                  </button>
                )
              : (
                  <button
                    type="button"
                    onClick={() => {
                      setTimezones(timezones.filter(t => t !== tz))
                    }}
                  >
                    <X
                      size={20}
                      fill="var(--color-danger-10)"
                      color="var(--color-danger-10)"
                    />
                  </button>
                )}
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
              )}
            >
              {timezoneFormatter.format(time)}
            </div>
          </div>
        )
      })}
    </>
  )
}
