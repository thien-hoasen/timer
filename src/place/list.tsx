import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { getCountry, getTimezone } from 'countries-and-timezones'
import { Home, Trash } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { getTimezoneName, LOCAL_TIMEZONE } from '../util/datetime'
import { PlaceStatus } from './status'
import { PlaceTime } from './time'

export function PlaceList(props: {
  time: Date
  timezones: TimezoneName[]
  setTimezones: (timezones: TimezoneName[]) => void
  isDeleting: boolean
  setIsDeleting: (isDeleting: boolean) => void
}): ReactElement {
  const { time, timezones, setTimezones, isDeleting, setIsDeleting } = props

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

        const isLocalTimezone = tz === LOCAL_TIMEZONE

        return (
          <div
            key={tz}
            className={twJoin(
              'h-max flex justify-between items-center gap-16 py-16',
              isLocalTimezone && 'border-b border-gray-3',
            )}
          >
            {isLocalTimezone
              ? (
                  <div className="p-8">
                    <Home
                      size={20}
                      fill="var(--color-accent-10)"
                      color="var(--color-accent-10)"
                    />
                  </div>
                )
              : isDeleting
                ? (
                    <button
                      type="button"
                      className="bg-gray-3 rounded-half p-8 shadow-6"
                      onClick={() => {
                        setTimezones(timezones.filter(timezone => timezone !== tz))
                        if (timezones.length === 1)
                          setIsDeleting(false)
                      }}
                    >
                      <Trash size={20} color="var(--color-gray-10)" />
                    </button>
                  )
                : (
                    <div className="p-8">
                      <PlaceStatus
                        time={time}
                        timezone={tz}
                      />
                    </div>
                  )}
            <div className="flex-1 flex flex-col">
              <div className="font-medium">
                {getTimezoneName(timezone.name)}
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
