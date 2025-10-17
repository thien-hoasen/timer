import { ColorThumb, ColorWheel, ColorWheelTrack } from 'react-aria-components'
import { triggerHaptic } from '../util/haptic'
import { colorToDate, dateToColor, getWheelColors, WHEEL_THICKNESS } from './render'

const THUMB_SIZE = WHEEL_THICKNESS - 6

export function WheelMain(props: {
  time: Date
  setTime: (time: Date) => void
  wheelRadius: { outer: number, inner: number }
}) {
  const { time, setTime, wheelRadius } = props

  const wheelColors = getWheelColors('accent').join(',')

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
          width: `${THUMB_SIZE}px`,
          height: `${THUMB_SIZE}px`,
        }}
        onClick={() => triggerHaptic()}
        onTouchEnd={() => triggerHaptic()}
      />
    </ColorWheel>
  )
}
