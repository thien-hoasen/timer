import type { ReactElement } from 'react'
import type { Place } from './type'
import { getCountry, getTimezone } from 'countries-and-timezones'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getDateTimeFormat } from '../util/datetime'
import { getPlaceName, MOCK_PLACES } from './type'

export function PlaceBox(props: {
  places: Place[]
  setPlaces: (places: Place[]) => void
}): ReactElement {
  const { places, setPlaces } = props

  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const togglePrimary = (selectedPlace: Place) => {
    const updatedPlaces = places.map((place) => {
      return { ...place, isPrimary: place.id === selectedPlace.id }
    })
    setPlaces(updatedPlaces)
  }

  return (
    <div className={[
      'flex flex-col font-medium',
      'bg-gray-1 rounded-8 px-16',
    ].join(' ')}
    >
      {places.map((place, index) => {
        const timezone = getTimezone(place.timezone)
        const country = getCountry(place.id)

        if (!timezone || !country) {
          return null
        }

        return (
          <div
            key={place.id}
            className={[
              'h-full flex justify-between items-center gap-16 py-16',
              index !== MOCK_PLACES.length - 1 && 'border-b border-gray-3',
            ].join(' ')}
          >
            <button
              type="button"
              onClick={() => togglePrimary(place)}
            >
              <Star
                size={20}
                fill={place.isPrimary
                  ? 'var(--color-star-10)'
                  : 'var(--color-gray-10)'}
                color={place.isPrimary
                  ? 'var(--color-star-10)'
                  : 'var(--color-gray-10)'}
              />
            </button>
            <div className="flex-1 flex flex-col">
              <div className="font-medium">
                {getPlaceName(place)}
              </div>
              <div className="text-xs font-light text-gray-10">
                {country.name}
              </div>
            </div>
            <div className={[
              'bg-accent-4 py-8 px-16 rounded-full',
              'font-medium text-sm text-accent-10',
            ].join(' ')}
            >
              {getDateTimeFormat(place.timezone).format(time)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
