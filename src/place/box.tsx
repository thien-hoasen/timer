import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { twJoin } from 'tailwind-merge'
import { PlaceList } from './list'
import { PlaceSearch } from './search'

export function PlaceBox(props: {
  time: Date
  timezones: TimezoneName[]
  setTimezones: (timezones: TimezoneName[]) => void
}): ReactElement {
  const { time, timezones, setTimezones } = props

  return (
    <div
      className={twJoin(
        'flex flex-col px-16 overflow-auto',
        'bg-gray-1 rounded-8 font-medium',
      )}
    >
      <PlaceList time={time} timezones={timezones} setTimezones={setTimezones} />
      <PlaceSearch timezones={timezones} setTimezones={setTimezones} />
    </div>
  )
}
