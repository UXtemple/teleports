import React, { PropTypes } from 'react'

const Vertical = ({ children, style }) => (
  <div
    style={{
      flexDirection: 'column',
      ...style
    }}
  >
    {children}
  </div>
)
Vertical.defaultProps = {
  style: {}
}
Vertical.propTypes = {
  style: PropTypes.object
}
export default Vertical
