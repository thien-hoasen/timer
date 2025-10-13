import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { PlaceList } from './list'
import { PlaceSearch } from './search'

export function PlaceBox(props: {
  time: Date
  timezones: TimezoneName[]
  setTimezones: (timezones: TimezoneName[]) => void
}): ReactElement {
  const { time, timezones, setTimezones } = props

  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  return (
    <div
      className={twJoin(
        'sm:flex-1 flex flex-col px-16 overflow-auto',
        'bg-gray-1 rounded-8 font-medium',
      )}
    >
      <div className="flex w-full items-center justify-between pt-16 pb-8">
        <button
          type="button"
          className="rounded-half p-8 shadow-6 bg-gray-3 text-gray-12"
          onClick={() => setIsDeleting(!isDeleting)}
        >
          {isDeleting ? <X size={20} /> : <Pencil size={20} />}
        </button>
        <PlaceSearch timezones={timezones} setTimezones={setTimezones} />
      </div>
      <PlaceList
        time={time}
        timezones={timezones}
        setTimezones={setTimezones}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </div>
  )
}
