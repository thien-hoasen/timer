export type Schedule = 'inOffice' | 'outOfOffice' | 'sleep'

export const SCHEDULE = {
  inOffice: {
    start: 9,
    end: 17,
    emoji: '🌆',
  },
  outOfOffice: {
    morning: { start: 6, end: 9, emoji: '🌇' },
    night: { start: 17, end: 21, emoji: '🏙' },
  },
  sleep: {
    morning: { start: 0, end: 6, emoji: '🌅' },
    night: { start: 21, end: 24, emoji: '🌃' },
  },
}
