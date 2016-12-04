import createHistory from './history.js'
import getDimensions from './get-dimensions.js'
import onDimensionsChange from './on-dimensions-change.js'
import React, { Component, PropTypes } from 'react'
import RuntimeReplace from './runtime-replace.js'

export default class Teleports extends Component {
  constructor(props) {
    super(props)

    const { apps, uri, Runtime, views } = props
    const { height, width } = getDimensions()

    onDimensionsChange(this.onDimensionsChange)

    this.apps = apps
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

  navigate = async (to, raw = false) => {
    const { state } = this
    // TODO route multiple apps
    // https://github.com/UXtemple/panels/blob/master/router/parse.js
    const app = state.uri.match(/^https?:\/\/(.+)(\/.*)/)[1]
    // TODO normalise uri
    // https://github.com/UXtemple/panels/blob/master/utils/normalise-uri/index.js
    const uri = raw ? to : `${state.uri}${to}`
    // TODO fetch apps
    // https://github.com/UXtemple/panels/blob/master/app/get.js
    // Review if System.import is now in a better place than it was when we started Panels.
    const views = await this.apps[app](uri)

    this.setState({
      uri,
      views
    })
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
      key: PropTypes.string.isRequired,
      props: PropTypes.object
    })
  ).isRequired
}
