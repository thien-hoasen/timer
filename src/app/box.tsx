import "../style/main.css"
import "@radix-ui/themes/styles.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Theme } from "@radix-ui/themes"
import { LayoutBox } from "../layout/box"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="violet" grayColor="mauve">
      <LayoutBox>
        Timer
      </LayoutBox>
    </Theme>
  </StrictMode>
)
