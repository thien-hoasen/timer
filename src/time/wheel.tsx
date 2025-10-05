import type { Color } from 'react-aria-components'
import { ColorThumb, ColorWheel, ColorWheelTrack, parseColor } from 'react-aria-components'
import { twJoin } from 'tailwind-merge'

export function TimeWheel(props: {
  time: Date
  setTime: (time: Date) => void
}) {
  const { time, setTime } = props

  return (
    <ColorWheel
      outerRadius={152}
      innerRadius={100}
      value={dateToColor(time)}
      onChange={value => setTime(colorToDate(value, time))}
    >
      <ColorWheelTrack
        style={{
          background: `conic-gradient(
            var(--color-accent-12) 0deg 75deg,
            var(--color-accent-10) 75deg 120deg,
            var(--color-accent-8) 120deg 255deg,
            var(--color-accent-10) 255deg 330deg,
            var(--color-accent-12) 330deg 360deg)`,
        }}
      />
      <ColorThumb
        className={state => twJoin(
          'border-2 border-gray-2 rounded-half',
          'w-42 h-42 box-border',
          state.isFocusVisible && 'w-56 h-56',
        )}
        style={{ backgroundColor: 'var(--color-gray-2)' }}
      />
    </ColorWheel>
  )
}

// The color wheel starts at hue 0, which is 6:00 AM
// So we need to adjust the hue by 360 degrees to start at 6:00 AM

function dateToColor(date: Date): Color {
  // Minutes since 6:00 AM
  const minutesSince6am = ((date.getHours() * 60 + date.getMinutes()) - 360 + 1440) % 1440
  // Convert to degrees
  const hue = (minutesSince6am / 1440) * 360
  return parseColor(`hsl(${hue}, 100%, 50%)`)
}

function colorToDate(color: Color, baseDate?: Date): Date {
  // Clamp degrees between 0 and 360
  const clamped = Math.max(0, Math.min(360, color.getChannelValue('hue')))
  // Convert to minutes since 6:00 AM
  const minutesSince6am = Math.round((clamped / 360) * 1440) % 1440
  // Calculate total minutes since midnight
  const totalMinutes = (minutesSince6am + 360) % 1440
  // Clamp minutes between 0 and 1439
  const timeClamped = Math.max(0, Math.min(1439, totalMinutes))
  // Calculate hours and minutes
  let hours = Math.floor(timeClamped / 60)
  let mins = timeClamped % 60

  // Snap minutes
  const snapped = snapMinutes(mins)
  if (snapped === 0 && mins > 45) {
    // Roll over to next hour
    hours = (hours + 1) % 24
  }
  mins = snapped

  // Use baseDate or today
  const date = baseDate ? new Date(baseDate) : new Date()
  date.setHours(hours, mins, 0, 0) // set hours, minutes, seconds, ms
  return date
}

// Snap to nearest 15, 30, 45, or 60
// Change this array to allow other snap points
const SNAP_POINTS = [0, 15, 30, 45, 60]
function snapMinutes(mins: number): number {
  let closest = SNAP_POINTS[0]
  let minDiff = Math.abs(mins - SNAP_POINTS[0])
  for (let i = 1; i < SNAP_POINTS.length; i++) {
    const diff = Math.abs(mins - SNAP_POINTS[i])
    if (diff < minDiff) {
      minDiff = diff
      closest = SNAP_POINTS[i]
    }
  }
  // If 60, roll over to 0 and add 1 hour
  if (closest === 60)
    return 0
  return closest
}
