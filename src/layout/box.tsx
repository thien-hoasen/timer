import type { ReactElement, ReactNode } from 'react'
import { useTheme } from '../theme/use'

export function LayoutBox(props: { children: ReactNode }): ReactElement {
  const { children } = props

  useTheme()

  return (
    <div className="w-full h-full overflow-hidden relative">
      {children}
    </div>
  )
}
