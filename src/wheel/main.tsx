import { ColorThumb, ColorWheel, ColorWheelTrack } from 'react-aria-components'
import { triggerHaptic } from '../util/haptic'
import {
  colorToDate,
  dateToColor,
  getWheelColors,
  WHEEL_INNER_RADIUS,
  WHEEL_OUTER_RADIUS,
  WHEEL_THICKNESS,
} from './render'

export function WheelMain(props: {
  time: Date
  setTime: (time: Date) => void
}) {
  const { time, setTime } = props

  const wheelColors = getWheelColors('accent').join(',')

  return (
    <ColorWheel
      outerRadius={WHEEL_OUTER_RADIUS}
      innerRadius={WHEEL_INNER_RADIUS}
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
