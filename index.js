import { _set } from './import.js'
import createHistory from './history.js'
import getDimensions from './get-dimensions.js'
import getViews from './get-views.js'
import onDimensionsChange from './on-dimensions-change.js'
import parseMountedApps from './parse-mounted-apps.js'
import React, { Component, PropTypes } from 'react'
import RuntimeReplace from './runtime-replace.js'

export default class Teleports extends Component {
  constructor(props) {
    super(props)

    const { height, width } = getDimensions()
    onDimensionsChange(this.onDimensionsChange)

    // TODO replace, fake for now
    _set(props.apps)

    this.history = createHistory(props.uri)
    this.history.onChange(this.onUriChange)

    this.state = {
      height,
      Runtime: RuntimeReplace,
      uri: '',
      views: [],
      width
    }

    this.navigate(props.uri, true)
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

  navigate = (to, raw = false) => {
    const { state } = this

    // TODO normalise uri
    // https://github.com/UXtemple/panels/blob/master/utils/normalise-uri/index.js
    const uri = raw ? to : `${state.uri}${to}`
    // find out which apps are mounted now
    this.mounted = parseMountedApps(uri)

    // gather their views
    getViews(this.mounted).then(({ Runtime, views }) => {
      this.setState({
        uri,
        Runtime,
        views
      })
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
      path: PropTypes.string.isRequired,
      props: PropTypes.object
    })
  ).isRequired
}
