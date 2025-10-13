import type { Color } from 'react-aria-components'
import { parseColor } from 'react-aria-components'
import { SCHEDULE } from '../place/schedule'

export const WHEEL_GAP = 16
export const WHEEL_THICKNESS = 48
export const GUESS_WHEEL_THICKNESS = 18

const VIEWPORT_WIDTH = window.innerWidth < 768 ? window.innerWidth : window.innerWidth / 2
const APP_PADDING = 12
const CARD_PADDING = 16

export const WHEEL_OUTER_RADIUS = Math.round(
  (VIEWPORT_WIDTH - APP_PADDING * 2 - CARD_PADDING * 2) / 2,
)
export const WHEEL_OUTER_DIAMETER = WHEEL_OUTER_RADIUS * 2

export const WHEEL_INNER_RADIUS = WHEEL_OUTER_RADIUS - WHEEL_THICKNESS
export const WHEEL_INNER_DIAMETER = WHEEL_INNER_RADIUS * 2

export type GuessColor = 'plum' | 'crimson' | 'red' | 'orange'
const GUESS_COLORS: GuessColor[] = ['plum', 'crimson', 'red', 'orange']
export function getGuessColor(index: number): GuessColor | null {
  if (index > GUESS_COLORS.length - 1)
    return null
  return GUESS_COLORS[index]
}

export function hourToDegrees(hour: number): string {
  return `${(hour / 24) * 360}deg`
}

export function getWheelColors(color: 'accent' | GuessColor): string[] {
  const sleepMorning = [
    `var(--${color}-4)`,
    hourToDegrees(SCHEDULE.sleep.morning.start),
    hourToDegrees(SCHEDULE.sleep.morning.end),
  ].join(' ')

  const outOfOfficeMorning = [
    `var(--${color}-6)`,
    hourToDegrees(SCHEDULE.outOfOffice.morning.start),
    hourToDegrees(SCHEDULE.outOfOffice.morning.end),
  ].join(' ')

  const inOffice = [
    `var(--${color}-9)`,
    hourToDegrees(SCHEDULE.inOffice.start),
    hourToDegrees(SCHEDULE.inOffice.end),
  ].join(' ')

  const outOfOfficeEvening = [
    `var(--${color}-6)`,
    hourToDegrees(SCHEDULE.outOfOffice.night.start),
    hourToDegrees(SCHEDULE.outOfOffice.night.end),
  ].join(' ')

  const sleepEvening = [
    `var(--${color}-4)`,
    hourToDegrees(SCHEDULE.sleep.night.start),
    hourToDegrees(SCHEDULE.sleep.night.end),
  ].join(' ')

  return [
    sleepMorning,
    outOfOfficeMorning,
    inOffice,
    outOfOfficeEvening,
    sleepEvening,
  ]
}

// The color wheel starts at hue 0, which is 6:00 AM
// So we need to adjust the hue by 360 degrees to start at 6:00 AM

export function dateToColor(date: Date): Color {
  // Minutes since 6:00 AM
  const minutesSince6am = ((date.getHours() * 60 + date.getMinutes()) - 360 + 1440) % 1440
  // Convert to degrees
  const hue = (minutesSince6am / 1440) * 360
  return parseColor(`hsl(${hue}, 100%, 50%)`)
}

export function colorToDate(color: Color, baseDate?: Date): Date {
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
