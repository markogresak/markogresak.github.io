import Typography from "typography"
import GithubTheme from "typography-theme-github"

import { textColor } from "./colors"
import initIcons from "./icons"

GithubTheme.bodyColor = textColor

const typography = new Typography(GithubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

initIcons()

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
