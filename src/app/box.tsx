import type { ReactElement } from 'react'
import { useState } from 'react'
import { LayoutBox } from '../layout/box'
import { PlaceBox } from '../place/box'
import { MOCK_TIMEZONES } from '../place/type'
import { TimeBox } from '../time/box'

export function AppBox(): ReactElement {
  const [time, setTime] = useState(initTime)
  const [timezones, setTimezones] = useState(MOCK_TIMEZONES)

  return (
    <LayoutBox>
      <div className="p-12 h-full flex flex-col gap-12">
        <PlaceBox time={time} timezones={timezones} setTimezones={setTimezones} />
        <TimeBox time={time} setTime={setTime} />
      </div>
    </LayoutBox>
  )
}

function initTime(): Date {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}
