import { css } from '@emotion/core'

export const primaryColor = 'var(--primary)'
export const textColor = 'var(--fg)'

export const lightStyle = css`
  :root {
    --bg: #fff;
    --primary: #3c00e0;
    --fg: rgba(0, 0, 0, 0.8);
    --title-line: rgba(0, 0, 0, 0.07);
    --fg--h6: rgba(0, 0, 0, 0.53);
    --fg--quote: rgba(0, 0, 0, 0.53);
    --quote-line: rgba(0, 0, 0, 0.53);
    --gh: #25292e;
  }
`

export const darkStyle = css`
  :root {
    --bg: #333;
    --primary: #c3adff;
    --fg: rgba(255, 255, 255, 0.8);
    --title-line: rgba(255, 255, 255, 0.17);
    --fg--h6: rgba(255, 255, 255, 0.53);
    --fg--quote: rgba(255, 255, 255, 0.53);
    --quote-line: rgba(255, 255, 255, 0.53);
    --gh: #fff;
  }
`
