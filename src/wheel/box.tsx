import type { TimezoneName } from 'countries-and-timezones'
import type { ReactElement } from 'react'
import { useLayoutEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { WheelGuess } from './guess'
import { WheelMain } from './main'
import { getGuessColor, GUESS_WHEEL_THICKNESS, WHEEL_THICKNESS } from './render'

const WHEEL_GAP = 16
const WHEEL_CONTAINER_PADDING = 56

function getWheelRadius() {
  const viewportWidth = window.innerWidth < 640 ? window.innerWidth : window.innerWidth / 2
  const outerRadius = Math.round((viewportWidth - WHEEL_CONTAINER_PADDING) / 2)
  const innerRadius = outerRadius - WHEEL_THICKNESS
  return { outer: outerRadius, inner: innerRadius }
}

export function WheelBox(props: {
  time: Date
  setTime: (time: Date) => void
  timezones: TimezoneName[]
}): ReactElement {
  const { time, setTime, timezones } = props

  const [wheelRadius, setWheelRadius] = useState(() => getWheelRadius())

  useLayoutEffect(() => {
    const handleResize = () => {
      const { outer, inner } = getWheelRadius()
      setWheelRadius({ outer, inner })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={twJoin(
        'bg-gray-1 rounded-8 p-16 w-full aspect-square sm:w-1/2',
        'flex justify-center items-center relative',
      )}
    >
      <WheelMain time={time} setTime={setTime} wheelRadius={wheelRadius} />
      {timezones.map((timezone, index) => {
        const color = getGuessColor(index)
        if (!color)
          return null
        return (
          <WheelGuess
            key={timezone}
            // the first WHEEL_GAP is the gap between the main wheel and the guess wheel
            diameter={wheelRadius.inner * 2 - WHEEL_GAP - (WHEEL_GAP + GUESS_WHEEL_THICKNESS) * index}
            color={color}
            timezone={timezone}
          />
        )
      })}
    </div>
  )
}
