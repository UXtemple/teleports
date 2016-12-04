import { render } from 'react-dom'
import React from 'react'
import Teleports from './index.js'

let isRendered = false
export default ({ root, ...props }) => {
  if (!isRendered) {
    isRendered = true

    render(
      <Teleports {...props} />,
      root
    )
  }
}
