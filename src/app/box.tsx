import type { ReactElement } from 'react'
import type { Place } from '../place/type'
import { useState } from 'react'
import { LayoutBox } from '../layout/box'
import { PlaceBox } from '../place/box'
import { MOCK_PLACES } from '../place/type'
import { TimeBox } from '../time/box'

export function AppBox(): ReactElement {
  const [places, setPlaces] = useState<Place[]>(MOCK_PLACES)
  const [time, setTime] = useState(initTime)

  return (
    <LayoutBox>
      <div className="p-12 h-full flex flex-col gap-12">
        <PlaceBox places={places} setPlaces={setPlaces} />
        <TimeBox places={places} time={time} setTime={setTime} />
      </div>
    </LayoutBox>
  )
}

function initTime(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}
