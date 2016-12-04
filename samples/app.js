import { Horizontal, Text, Vertical } from '../blocks.js'
import React from 'react'
import render from '../render.js'
import Teleport from '../teleport.js'

const Home = ({ children, height, width }) => (
  <Vertical style={{ height, width }}>
    <Text>
      height: {height}
      width: {width}
      hey!
    </Text>

    <Teleport href='app'>
      <Text>
        go there
      </Text>
    </Teleport>

    {children}
  </Vertical>
)

const Content = ({ children, content, height, width }) => (
  <Text style={{ height, width }}>
    hey!
    {content}
    {children}
  </Text>
)

export const get = async (uri) => {
  const path = uri.match(/^https?:\/\/.+(\/.*)/)[1]

  if (path === '/') {
    return [{
      component: Home,
      key: '/',
      props: {},
    }]
  } else {
    return [{
      component: Home,
      key: '/',
      props: {},
    }, {
      component: Content,
      key: '/content',
      props: {
        content: 'hoo'
      },
    }]
  }
}

import style from '../runtime-replace-style.js'

const RuntimeHorizontal = ({ height, views, width }) => (
  <Horizontal style={{ height, width }}>
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
  </Horizontal>
)

const RuntimeVertical = ({ height, views, width }) => (
  <Vertical style={{ height, width }}>
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
  </Vertical>
)

// TODO revisit, this might be common code across apps
let app = location.hostname
if (location.port !== 80 || location.port !== 443) {
  app = `${app}:${location.port}`
}

const apps = {}
apps[app] = get
const root = document.getElementById('root')
const uri = location.href

get(uri).then(views => {
  render({
    apps,
    root,
    Runtime: RuntimeVertical,
    uri,
    views,
  })
})
