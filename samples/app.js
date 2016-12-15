import { Horizontal, Teleport, Text, Vertical } from '../blocks.js'
import MyApp from './my-app.js'
import React from 'react'
import render from '../render.js'

import * as fromTvApp from './tv/app.js'

const Home = ({ border, children, height, width }) => (
  <Vertical style={{ border, height, width }}>
    <Text>
      height: {height}
      width: {width}
      hey!
    </Text>

    <Teleport href='content'>
      <Text>
        go there
      </Text>
    </Teleport>

    <Teleport href='/https://another.app.com/'>
      Another app!
    </Teleport>

    {children}
  </Vertical>
)

const Content = ({ border, children, content, height, width }) => (
  <Text style={{ border, height, width }}>
    hey!
    {content}
    {children}
  </Text>
)

export const get = async (uri) => {
  const views = [{
    component: Home,
    path: '/',
    props: {
      border: '1px solid blue'
    },
  }]

  switch(uri) {
  case '/content':
  case '/content/':
    views.push({
      component: Content,
      path: '/content',
      props: {
        border: '1px solid red',
        content: 'some content'
      },
    })
    break

  case '/content?thing':
  case '/content?thing/':
    views.push({
      component: Content,
      path: '/content',
      props: {
        border: '1px solid green',
        content: 'some thing'
      },
    })
    break

  case '/content/more':
  case '/content/more/':
    views.push({
      component: Content,
      path: '/content/more',
      props: {
        border: '1px solid purple',
        content: 'more content'
      },
    })
    break
  }

  return views
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

const RuntimeCrazy = ({ height, views, width }) => {
  const [first, ...rest] = views
  const { component:Component, key, props } = first

  return (
    <Horizontal>
      <Component
        {...props}
        height={height}
        width={width/2}
      />

      <RuntimeVertical height={height} width={width / 2} views={rest} />

      {style}
    </Horizontal>
  )
}

// TODO revisit, this might be common code across apps
let app = location.hostname
if (location.port !== 80 || location.port !== 443) {
  app = `${app}:${location.port}`
}

// import getMyApp from './my-app-in-teleports.js'

const apps = {}
apps[app] = {
  get: fromTvApp.get,

  // Runtime: RuntimeHorizontal,
  Runtime: fromTvApp.Runtime // RuntimeVertical,
  // Runtime: RuntimeCrazy
}
apps['another.app.com'] = {
  // get: getMyApp 
  get: async (uri) => {
    return [{
      component: ({ height, width }) => (
        <Text style={{ backgroundColor:  'red' }}>another</Text>
      ),
      path: '/'
    }]
  },

  // Runtime: RuntimeHorizontal,
  // Runtime: RuntimeVertical,
  // Runtime: RuntimeHorizontal,
}
const root = document.getElementById('root')
const uri = location.href

apps[app].get(`${location.pathname}${location.search}`).then(views => {
  render({
    apps,
    root,
    Runtime: apps[app].Runtime,
    uri,
    views,
  })
})


// FOR MY APP ALONE
// import { render as reactRender } from 'react-dom'

// reactRender(
//   <MyApp text='eqewqewqeqweqwweq' />,
//   root
// )
