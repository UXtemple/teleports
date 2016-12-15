import Genres from './pages/Genres.js'
import Movies from './pages/Movies.js'
import Player from './pages/Player.js'
import React from 'react'

export Runtime from './pages/runtime.js'

const genres = [{
  title: 'Action',
  path: 'action'
}, {
  title: 'Comedy',
  path: 'comedy'
}]

const movies = {
  action: [{
    title: '48 hours',
    path: '/48-hours'
  }, {
    title: '49 hours',
    path: '/49-hours'
  }],

  comedy: [{
    title: '48 laughs',
    path: '48-laughs'
  }, {
    title: '49 laughs',
    path: '49-laughs'
  }]
}


export const get = async (uri) => {
  const views = [{
    component: <Genres genres={genres} />,
    path: '/',
    props: {}
  }]

  switch(uri) {
    case '/action':
    case '/action/':
      views.push({
        component: <Movies movies={movies.action} />,
        path: '/action',
        props: {}
      })
      break

    case '/comedy':
    case '/comedy/':
      views.push({
        component: <Movies movies={movies.comedy} />,
        path: '/comedy',
        props: {}
      })
      break

    case '/action/48-hours':
    case '/action/48-hours/':
      views.push({
        component: <Movies movies={movies.action} />,
        path: '/action',
        props: {}
      })
      views.push({
        component: <Player />,
        path: '/action/48-hours',
        props: {}
      })
      break
  }

  return views
}
