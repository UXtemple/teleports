import createHistory from './history.js'
import getDimensions from './get-dimensions.js'
import onDimensionsChange from './on-dimensions-change.js'
import parseMountedApps from './parse-mounted-apps.js'
import React, { Component, PropTypes } from 'react'
import RuntimeReplace from './runtime-replace.js'

let apps = {}
// TODO fetch apps
// https://github.com/UXtemple/panels/blob/master/app/get.js
// Review if System.import is now in a better place than it was when we started Panels.
const System = {
  import: async (app) => (
    apps[app]
  )
}

export default class Teleports extends Component {
  constructor(props) {
    super(props)

    const { uri, Runtime, views } = props
    const { height, width } = getDimensions()

    onDimensionsChange(this.onDimensionsChange)

    // TODO replace, fake for now
    apps = props.apps
    this.mounted = parseMountedApps(uri)
    this.history = createHistory(uri)
    this.history.onChange(this.onUriChange)
    this.state = {
      height,
      Runtime,
      uri,
      views,
      width
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { state } = this
    if (state.uri !== prevState.uri) {
      if (this.uriChangedOutside) {
        this.uriChangedOutside = false
      } else {
        this.history.push(state.uri)
      }
    }
  }

  getChildContext = () => ({
    navigate: this.navigate
  })

  // TODO navigate from teleport should always be aware of the current URI its at
  navigate = async (to, raw = false) => {
    const { state } = this

    try {
      // TODO normalise uri
      // https://github.com/UXtemple/panels/blob/master/utils/normalise-uri/index.js
      const uri = raw ? to : `${state.uri}${to}`
      let Runtime = state.Runtime

      const mountedApps = parseMountedApps(uri)
      this.mounted = mountedApps

      const viewsPerApp = await Promise.all(
        mountedApps.map(({ app, path }, mountedAt) => (
          System.import(app)
          .then(async a => ({
            app,
            mountedAt,
            Runtime: a.Runtime,
            views: await a.get(path)
          }))
        ))
      )

      const focusApp = viewsPerApp[viewsPerApp.length - 1]
      if (focusApp && focusApp.Runtime) {
        Runtime = focusApp.Runtime
      }

      const views = []
      viewsPerApp.forEach(data => {
        data.views.forEach(v => {
          // TODO preferably don't remap
          // however, we need keys for the runtime so that they are unique
          views.push({
            ...v,
            // context: 
            key: `${data.app}-${data.mountedAt}-${v.path}`
          })
        })
      })

      this.setState({
        uri,
        Runtime,
        views
      })
    } catch(err) {
      console.error('err', err)
    }
  }

  onDimensionsChange = ({ height, width }) => {
    this.setState({
      height,
      width
    })
  }

  onUriChange = uri => {
    this.uriChangedOutside = true
    this.navigate(this.history.getUri(), true)
  }

  render() {
    const { height, Runtime, views, width } = this.state

    return (
      <Runtime
        height={height}
        views={views}
        width={width}
      />
    )
  }
}
Teleports.childContextTypes = {
  navigate: PropTypes.func.isRequired
}
Teleports.defaultProps = {
  apps: {},
  Runtime: RuntimeReplace,
  uri: '',
  views: []
}
Teleports.propTypes = {
  // TODO app shape
  apps: PropTypes.shape({
  }).isRequired,
  Runtime: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      path: PropTypes.string.isRequired,
      props: PropTypes.object
    })
  ).isRequired
}
