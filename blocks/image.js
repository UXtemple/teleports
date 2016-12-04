import React, { PropTypes } from 'react'

const Image = ({ style, src, text }) => (
  <img
    alt={text}
    style={style}
    src={src}
  />
)
Image.propTypes = {
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  text: PropTypes.string
}
