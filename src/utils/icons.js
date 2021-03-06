import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faStackOverflow,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faMoon, faSun, faRss } from '@fortawesome/free-solid-svg-icons'

export default function initIcons() {
  library.add(faGithub, faStackOverflow, faTwitter, faSun, faMoon, faRss)
}
