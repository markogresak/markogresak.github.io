import { css } from '@emotion/core'

export const primaryColor = 'var(--primary-color)'
export const textColor = 'var(--text-color)'

export const lightStyle = css`
  :root {
    --background-color: #fff;
    --primary-color: #3c00e0;
    --text-color: rgba(0, 0, 0, 0.8);
    --title-border-bottom-color: rgba(0, 0, 0, 0.07);
    --h6-color: rgba(0, 0, 0, 0.53);
    --blockquote-color: rgba(0, 0, 0, 0.53);
    --blockquote-border-left-color: rgba(0, 0, 0, 0.53);
    --icon-github-color: #25292e;
  }
`

export const darkStyle = css`
  :root {
    --background-color: #333;
    --primary-color: #c3adff;
    --text-color: rgba(255, 255, 255, 0.8);
    --title-border-bottom-color: rgba(255, 255, 255, 0.17);
    --h6-color: rgba(255, 255, 255, 0.53);
    --blockquote-color: rgba(255, 255, 255, 0.53);
    --blockquote-border-left-color: rgba(255, 255, 255, 0.53);
    --icon-github-color: #fff;
  }
`
