import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { getDateTimeFormatter } from '../util/datetime'

export function TimePreset(props: {
  time: Date
  setTime: (time: Date) => void
}): ReactElement {
  const { time } = props

  return (
    <div className="flex flex-col h-full justify-center items-center tabular-nums">
      <div className="text-lg">
        {getDateTimeFormatter().format(time)}
      </div>
      <TimeNow />
    </div>
  )
}

function TimeNow(): ReactElement {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-light text-gray-10">
      {getDateTimeFormatter().format(now)}
    </div>
  )
}
