import React, { PropTypes } from 'react'

const Horizontal = ({ children, style }) => (
  <div
    style={{
      flexDirection: 'row',
      ...style
    }}
  >
    {children}
  </div>
)
Horizontal.defaultProps = {
  style: {}
}
Horizontal.propTypes = {
  style: PropTypes.object
}
export default Horizontal
