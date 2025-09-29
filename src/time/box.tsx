import type { ReactElement } from 'react'
import type { Place } from '../place/type'
import { getPlaceName } from '../place/type'
import { getDateTimeFormat } from '../util/datetime'

export function TimeBox(props: {
  places: Place[]
  time: Date
}): ReactElement {
  const { places, time } = props

  return (
    <div className="flex-1 bg-gray-1 rounded-8 p-16">
      <div className="flex justify-between font-medium pb-12">
        <div>
          Selected Time
        </div>
        <div>
          {getDateTimeFormat().format(time)}
        </div>
      </div>
      {places.map(place => (
        <div key={place.id} className="flex justify-between">
          <div>
            {getPlaceName(place)}
          </div>
          <div>
            {getDateTimeFormat(place.timezone).format(time)}
          </div>
        </div>
      ))}
    </div>
  )
}
