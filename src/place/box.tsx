import type { ReactElement } from 'react'

export function PlaceBox(): ReactElement {
  return (
    <div>
      <div>Selected Places:</div>
      <ul>
        <li>Tokyo - 3pm - primary</li>
        <li>Vietnam - 1pm - secondary</li>
        <li>America - 5pm - secondary</li>
      </ul>
    </div>
  )
}
