import style from '../runtime-replace-style.js'
import React from 'react'

export const RuntimeVertical = ({ height, views, width }) => (
  <div style={{ flexDirection: 'column', height, width }}>
    {views.map(({ component:Component, key, props }) => (
      <Component
        {...props}
        height={height}
        key={key}
        width={360}
      >
        {style}
      </Component>
    ))}
  </div>
)

export const RuntimeHorizontal = ({ height, views, width }) => (
  <div style={{ flexDirection: 'row', height, width }}>
    {views.map(({ component:Component, key, props }) => (
      <Component
        {...props}
        height={200}
        key={key}
        width={width}
      >
        {style}
      </Component>
    ))}
  </div>
)

export const RuntimeCrazy = ({ height, views, width }) => {
  const [first, ...rest] = views
  const { component:Component, key, props } = first

  return (
    <div style={{ flexDirection: 'row' }}>
      <Component
        {...props}
        height={height}
        width={width/2}
      />

      <RuntimeVertical height={height} width={width / 2} views={rest} />

      {style}
    </div>
  )
}
