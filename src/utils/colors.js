import { css } from '@emotion/core'

export const primaryColor = 'var(--primary)'
export const textColor = 'var(--fg)'
export const bgColor = 'var(--bg)'
export const bgLightColor = 'var(--bg-light)'
export const bgDarkColor = 'var(--bg-dark)'

export const rootStyle = css`
  :root {
    --bg-dark: #333;
    --bg-light: #fff;
    --fg-light: rgba(0, 0, 0, 0.8);
    --fg-dark: rgba(255, 255, 255, 0.8);
    --primary-light: #3c00e0;
    --primary-dark: #c3adff;
  }
`

export const lightStyle = css`
  :root {
    --bg: ${bgLightColor};
    --fg: var(--fg-light);
    --primary: var(--primary-light);

    --title-line: rgba(0, 0, 0, 0.07);
    --fg--h6: rgba(0, 0, 0, 0.53);
    --fg--quote: rgba(0, 0, 0, 0.53);
    --quote-line: rgba(0, 0, 0, 0.53);
    --gh: #25292e;
    --code-block: #faf8f5;
  }
`

export const darkStyle = css`
  :root {
    --bg: ${bgDarkColor};
    --fg: var(--fg-dark);
    --primary: var(--primary-dark);

    --title-line: rgba(255, 255, 255, 0.17);
    --fg--h6: rgba(255, 255, 255, 0.53);
    --fg--quote: rgba(255, 255, 255, 0.53);
    --quote-line: rgba(255, 255, 255, 0.53);
    --gh: #fff;
    --code-block: #2b2b2b;
  }
`
