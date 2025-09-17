import type { ReactElement, ReactNode } from "react"

export function LayoutBox(props: { children: ReactNode }): ReactElement {
  const { children } = props

  return (
    <div className={["w-full h-full overflow-hidden", "relative"].join(" ")}>
      {children}
    </div>
  )
}
