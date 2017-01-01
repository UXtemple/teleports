import React from 'react'
// import style from './runtime-replace-style.js'

const RuntimeReplace = ({ height, views, width }) => {
  const view = views[views.length - 1]
  if (!view) return null

  const { component:Component, key, props } = view

  return (
    <Component
      {...props}
      height={height}
      key={key}
      width={width}
    />
  )
}
export default RuntimeReplace
