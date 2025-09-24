import type { ReactElement } from 'react'

export function TimeBox(): ReactElement {
  return (
    <div>
      <div>Selected Time: 3pm</div>
      <ul>
        <li>Tokyo - 3pm</li>
        <li>Vietnam - 1pm</li>
        <li>America - 5pm</li>
      </ul>
    </div>
  )
}
