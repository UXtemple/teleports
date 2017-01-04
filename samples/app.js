import { RuntimeCrazy, RuntimeHorizontal, RuntimeVertical } from './runtimes.js'
import MyApp from './my-app.js'
import React from 'react'
import render from '../render.js'
import Teleport from '../teleport.js'

const Home = ({ border, children, context, height, width }) => (
  <div style={{ border, flexDirection: 'column', height, width }}>
    <div>
      height: {height}
      width: {width}
      hey!
    </div>

    <Teleport context={context} href='content'>
      <div>
        go there
      </div>
    </Teleport>

    <Teleport context={context} href='/https://another.app.com/'>
      Another app!
    </Teleport>

    {children}
  </div>
)

const Content = ({ border, children, content, height, width }) => (
  <div style={{ border, flexDirection: 'column', height, width }}>
    hey!
    {content}
    {children}
  </div>
)

export const get = async ({ path }) => {
  const views = [{
    component: Home,
    path: '/',
    props: {
      border: '1px solid blue'
    },
  }]

  switch(path) {
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


// TODO revisit, this might be common code across apps
let app = location.hostname
if (location.port !== 80 || location.port !== 443) {
  app = `${app}:${location.port}`
}

const apps = {
  [app]: {
    get,
    Runtime: RuntimeHorizontal
  },
  'another.app.com': {
    get: async ({ path }) => {
      return [{
        component: ({ height, width }) => (
          <div style={{ backgroundColor:  'red' }}>another</div>
        ),
        path: '/'
      }]
    }
  }
}
render({
  apps,
  root: document.getElementById('root'),
  uri: location.href,
})
