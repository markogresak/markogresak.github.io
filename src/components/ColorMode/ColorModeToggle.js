import React from 'react'
import Switch from 'react-switch'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { rhythm } from '../../utils/typography'
import { bgColor, bgLightColor, bgDarkColor } from '../../utils/colors'

const Label = styled.label`
  position: absolute;
  top: ${rhythm(0.5)};
  right: ${rhythm(0.5)};

  .react-switch-bg {
    background: ${({ checked }) =>
      checked ? bgLightColor : bgDarkColor} !important;
    color: ${bgColor} !important;
  }

  .react-switch-handle {
    background: ${bgColor} !important;
  }
`

const IconWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const ColorModeToggle = ({ checked, onChange }) => (
  <Label checked={checked}>
    <Switch
      height={24}
      width={48}
      checked={checked}
      onChange={onChange}
      aria-label={`Switch to ${checked ? 'light' : 'dark'} mode`}
      uncheckedIcon={
        <IconWrapper>
          <FontAwesomeIcon icon="moon" />
        </IconWrapper>
      }
      checkedIcon={
        <IconWrapper>
          <FontAwesomeIcon icon="sun" />
        </IconWrapper>
      }
    />
  </Label>
)

export default ColorModeToggle
