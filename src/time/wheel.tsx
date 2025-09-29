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
            var(--color-accent-10) 0deg 75deg,
            var(--color-accent-6) 75deg 120deg,
            var(--color-yellow-4) 120deg 255deg,
            var(--color-accent-6) 255deg 330deg,
            var(--color-accent-10) 330deg 360deg
          )`,
        }}
      />
      <ColorThumb
        className={state => twJoin(
          'border-2 border-accent-8 rounded-half',
          'w-52 h-52 box-border',
          state.isFocusVisible && 'w-56 h-56',
        )}
        style={{ backgroundColor: 'var(--color-accent-8)' }}
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
  const hours = Math.floor(timeClamped / 60)
  const mins = timeClamped % 60
  // Use baseDate or today
  const date = baseDate ? new Date(baseDate) : new Date()
  date.setHours(hours, mins, 0, 0) // set hours, minutes, seconds, ms
  return date
}
