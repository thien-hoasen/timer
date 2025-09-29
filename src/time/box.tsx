import type { ReactElement } from 'react'
import type { Place } from '../place/type'
import { twJoin } from 'tailwind-merge'
import { TimePreset } from './preset'
import { TimeWheel } from './wheel'

export function TimeBox(props: {
  places: Place[]
  time: Date
  setTime: (time: Date) => void
}): ReactElement {
  const { time, setTime } = props

  return (
    <div
      className={twJoin(
        'bg-gray-1 rounded-8 p-16 w-full aspect-square',
        'flex justify-center items-center relative',
      )}
    >
      <TimeWheel time={time} setTime={setTime} />
      <div className="absolute w-190 aspect-square">
        <TimePreset time={time} setTime={setTime} />
      </div>
    </div>
  )
}
