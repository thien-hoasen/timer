import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { getCountry, getTimezone } from 'countries-and-timezones'
import { Home, X } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { PlaceStatus } from './status'
import { PlaceTime } from './time'
import { LOCAL_TIMEZONE } from './type'

export function PlaceList(props: {
  time: Date
  timezones: TimezoneName[]
  setTimezones: (timezones: TimezoneName[]) => void
}): ReactElement {
  const { time, timezones, setTimezones } = props

  return (
    <>
      {/* Make sure the local timezone is always at the top and we don't show it twice */}
      {[
        LOCAL_TIMEZONE,
        ...timezones.filter(tz => tz !== LOCAL_TIMEZONE),
      ].map((tz) => {
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
              'h-max flex justify-between items-center gap-16 py-16',
              'border-b border-gray-3',
            )}
          >
            {tz === LOCAL_TIMEZONE
              ? (
                  <Home
                    size={20}
                    fill="var(--color-accent-10)"
                    color="var(--color-accent-10)"
                  />
                )
              : (
                  <div className="flex flex-col items-center gap-16">
                    <PlaceStatus time={time} timezone={tz} />
                    <button
                      type="button"
                      onClick={() => {
                        setTimezones(timezones.filter(t => t !== tz))
                      }}
                    >
                      <X
                        size={20}
                        fill="var(--color-gray-10)"
                        color="var(--color-gray-10)"
                      />
                    </button>
                  </div>
                )}
            <div className="flex-1 flex flex-col">
              <div className="font-medium">
                {tz.split('/').pop()?.replaceAll('_', ' ')}
              </div>
              <div className="text-xs font-light text-gray-10">
                {country.name}
              </div>
            </div>
            <PlaceTime time={time} timezone={tz} />
          </div>
        )
      })}
    </>
  )
}
