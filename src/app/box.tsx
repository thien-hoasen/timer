import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LayoutBox } from '../layout/box'
import '../style/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LayoutBox>
      Hello world
    </LayoutBox>
  </StrictMode>,
)
