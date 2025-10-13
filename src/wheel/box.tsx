import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { twJoin } from 'tailwind-merge'
import { WheelGuess } from './guess'
import { WheelMain } from './main'
import {
  getGuessColor,
  GUESS_WHEEL_THICKNESS,
  WHEEL_GAP,
  WHEEL_INNER_DIAMETER,
} from './render'

export function WheelBox(props: {
  time: Date
  setTime: (time: Date) => void
  timezones: TimezoneName[]
}): ReactElement {
  const { time, setTime, timezones } = props
  return (
    <div
      className={twJoin(
        'bg-gray-1 rounded-8 p-16 w-full aspect-square',
        'flex justify-center items-center relative',
      )}
    >
      <WheelMain time={time} setTime={setTime} />
      {timezones.map((timezone, index) => {
        return (
          <WheelGuess
            key={timezone}
            // the first WHEEL_GAP is the gap between the main wheel and the guess wheel
            diameter={WHEEL_INNER_DIAMETER - WHEEL_GAP - (WHEEL_GAP + GUESS_WHEEL_THICKNESS) * index}
            color={getGuessColor(index)}
            timezone={timezone}
          />
        )
      })}
    </div>
  )
}
