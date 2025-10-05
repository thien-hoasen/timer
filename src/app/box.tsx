import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { LayoutBox } from '../layout/box'
import { PlaceBox } from '../place/box'
import { TimeBox } from '../time/box'

export function AppBox(): ReactElement {
  const [time, setTime] = useState(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  })
  const [timezones, setTimezones] = useState<TimezoneName[]>(() => {
    const tzs = localStorage.getItem('timezones') as string | null
    return tzs ? JSON.parse(tzs) : []
  })

  const onTimezonesChange = (tzs: TimezoneName[]) => {
    setTimezones(tzs)
    localStorage.setItem('timezones', JSON.stringify(tzs))
  }

  return (
    <LayoutBox>
      <div className="p-12 h-full flex flex-col gap-12">
        <PlaceBox
          time={time}
          timezones={timezones}
          setTimezones={onTimezonesChange}
        />
        <TimeBox time={time} setTime={setTime} />
      </div>
    </LayoutBox>
  )
}
