import { useLayoutEffect, useState } from 'react'
import { ColorThumb, ColorWheel, ColorWheelTrack } from 'react-aria-components'
import { triggerHaptic } from '../util/haptic'
import {
  colorToDate,
  dateToColor,
  getWheelColors,
  WHEEL_CONTAINER_PADDING,
  WHEEL_THICKNESS,
} from './render'

export function WheelMain(props: {
  time: Date
  setTime: (time: Date) => void
}) {
  const { time, setTime } = props

  const wheelColors = getWheelColors('accent').join(',')

  const [wheelRadius, setWheelRadius] = useState({ outer: 0, inner: 0 })

  useLayoutEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth < 640 ? window.innerWidth : window.innerWidth / 2
      const outerRadius = Math.round((viewportWidth - WHEEL_CONTAINER_PADDING) / 2)
      const innerRadius = outerRadius - WHEEL_THICKNESS
      setWheelRadius({ outer: outerRadius, inner: innerRadius })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ColorWheel
      outerRadius={wheelRadius.outer}
      innerRadius={wheelRadius.inner}
      value={dateToColor(time)}
      onChange={value => setTime(colorToDate(value, time))}
    >
      <ColorWheelTrack
        style={{ background: `conic-gradient(${wheelColors})` }}
      />
      <ColorThumb
        className="border-2 border-white-a12 rounded-half box-border shadow-2"
        style={{
          backgroundColor: 'var(--white-a12)',
          width: `${WHEEL_THICKNESS - 6}px`,
          height: `${WHEEL_THICKNESS - 6}px`,
        }}
        onClick={() => triggerHaptic()}
        onTouchEnd={() => triggerHaptic()}
      />
    </ColorWheel>
  )
}
