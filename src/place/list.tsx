import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { getTimezone } from 'countries-and-timezones'
import { Trash } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import {
  getTimezoneWithCountry,
  LOCAL_TIMEZONE,
  LOCAL_TIMEZONE_DATA,
} from '../util/datetime'
import { getGuessColor } from '../wheel/render'
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

  if (!LOCAL_TIMEZONE || !LOCAL_TIMEZONE_DATA)
    throw new Error('Local timezone is not found')

  const removeTimezone = (timezone: TimezoneName) => {
    setTimezones(timezones.filter(tz => tz !== timezone))
  }

  return (
    <>
      <div
        className={twJoin(
          'h-max flex justify-between items-center gap-16 py-16',
          'border-b border-gray-3',
        )}
      >
        <div className="text-3xl sm:text-4xl lg:text-5xl">
          {LOCAL_TIMEZONE_DATA.flagEmoji}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="font-medium">
            {LOCAL_TIMEZONE_DATA.timezoneName}
          </div>
          <div className="text-xs font-light text-gray-10">
            {LOCAL_TIMEZONE_DATA.countryName}
          </div>
        </div>
        <PlaceTime
          time={time}
          timezone={LOCAL_TIMEZONE.name as TimezoneName}
          color="accent"
        />
        <PlaceStatus
          time={time}
          timezone={LOCAL_TIMEZONE.name as TimezoneName}
        />
      </div>
      {timezones.map((timezone, index) => {
        const timezoneData = getTimezone(timezone)
        if (!timezoneData)
          return null
        const color = getGuessColor(index)
        if (!color)
          return null
        const { timezoneName, countryName, flagEmoji } = getTimezoneWithCountry(timezoneData)
        return (
          <div
            key={timezone}
            className="h-max flex justify-between items-center gap-16 py-16"
          >
            {isDeleting
              ? (
                  <button
                    type="button"
                    className="bg-gray-3 rounded-half p-8 shadow-6"
                    onClick={() => {
                      removeTimezone(timezone)
                      if (timezones.length === 1)
                        setIsDeleting(false)
                    }}
                  >
                    <Trash size={20} color="var(--gray-10)" />
                  </button>
                )
              : (
                  <div className="text-3xl sm:text-4xl lg:text-5xl">
                    {flagEmoji}
                  </div>
                )}
            <div className="flex-1 flex flex-col">
              <div className="font-medium">
                {timezoneName}
              </div>
              <div className="text-xs font-light text-gray-10">
                {countryName}
              </div>
            </div>
            <PlaceTime time={time}timezone={timezone} color={color} />
            <PlaceStatus time={time} timezone={timezone} />
          </div>
        )
      })}
    </>
  )
}
