import React, { Component } from 'react'

import { getMediaQuery } from './utils'

class ColorMode extends Component {
  state = {
    ColorModeContainer: undefined,
    mediaQuery: undefined,
  }

  componentDidMount() {
    import('./ColorModeContainer').then((module) => {
      this.setState({
        ColorModeContainer: module.default,
        mediaQuery: getMediaQuery(),
      })
    })
  }

  render() {
    const { ColorModeContainer, mediaQuery } = this.state

    return ColorModeContainer && mediaQuery ? (
      <ColorModeContainer mediaQuery={mediaQuery} />
    ) : null
  }
}

export default ColorMode
