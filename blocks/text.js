import React, { PropTypes } from 'react'

const Text = ({ children, style }) => (
  <div style={style}>
    {children}
  </div>
)
Text.propTypes = {
  style: PropTypes.object
}
export default Text
