import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LayoutBox } from '../layout/box'
import { PlaceBox } from '../place/box'
import { TimeBox } from '../time/box'
import '../style/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LayoutBox>
      <div className="m-12 flex flex-col gap-12">
        <PlaceBox />
        <TimeBox />
      </div>
    </LayoutBox>
  </StrictMode>,
)
