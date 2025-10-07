import type { ReactElement } from 'react'
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { useHaptic } from '../hook/useHaptic'
import { getDateTimeFormatter } from '../util/datetime'

export function TimePreset(props: {
  time: Date
  setTime: (time: Date) => void
}): ReactElement {
  const { time, setTime } = props

  const { triggerHaptic } = useHaptic()

  return (
    <div
      className={twJoin(
        'flex flex-col justify-between items-center',
        'h-full p-8 text-accent-10',
      )}
    >
      <button
        type="button"
        onClick={() => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          setTime(today)
          triggerHaptic()
        }}
      >
        <Moon size={24} />
      </button>
      <div className="flex w-full justify-between items-center">
        <button
          type="button"
          onClick={() => {
            const today = new Date()
            today.setHours(18, 0, 0, 0)
            setTime(today)
            triggerHaptic()
          }}
        >
          <Sunset size={24} />
        </button>
        <div>
          {getDateTimeFormatter().format(time)}
        </div>
        <button
          type="button"
          onClick={() => {
            const today = new Date()
            today.setHours(6, 0, 0, 0)
            setTime(today)
            triggerHaptic()
          }}
        >
          <Sunrise size={24} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          const today = new Date()
          today.setHours(12, 0, 0, 0)
          setTime(today)
          triggerHaptic()
        }}
      >
        <Sun size={24} />
      </button>
    </div>
  )
}
