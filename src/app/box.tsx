import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { LayoutBox } from '../layout/box'
import { PlaceBox } from '../place/box'
import { LOCAL_TIMEZONE } from '../util/datetime'
import { WheelBox } from '../wheel/box'

export function AppBox(): ReactElement {
  const [time, setTime] = useState(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  })
  const [timezones, setTimezones] = useState<TimezoneName[]>(() => {
    const tzs = localStorage.getItem('timezones') as string | null
    if (!tzs)
      return []
    return JSON.parse(tzs).filter((tz: string) => tz !== LOCAL_TIMEZONE?.name)
  })

  const onTimezonesChange = (tzs: TimezoneName[]) => {
    setTimezones(tzs)
    localStorage.setItem('timezones', JSON.stringify(tzs))
  }

  return (
    <LayoutBox>
      <div className="p-12 h-full flex flex-col sm:flex-row gap-12 max-w-[1024px] sm:mx-auto">
        <PlaceBox
          time={time}
          timezones={timezones}
          setTimezones={onTimezonesChange}
        />
        <WheelBox
          time={time}
          setTime={setTime}
          timezones={timezones}
        />
      </div>
    </LayoutBox>
  )
}
