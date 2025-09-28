import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppBox } from './app/box'
import './style/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppBox />
  </StrictMode>,
)
