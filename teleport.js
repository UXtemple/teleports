import React, { Component, PropTypes } from 'react'

export default class Teleport extends Component {
  onClick = e => {
    const { context, props } = this

    // ignore click for new tab / new window behavior
    if (props.goTo || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent.which === 2) return

    e.preventDefault()

    const href = props.raw ? props.href : `${props.context || context.context}${props.href}`
    return context.navigate(href, true)
  }

  render() {
    const { children, href, goTo, style } = this.props

    const props = {
      href,
      onClick: this.onClick,
      style,
    }

    if (goTo) {
      props.target = '_blank'
    }

    return (
      <a {...props}>
        {children}
      </a>
    )
  }
}
Teleport.contextTypes = {
  context: PropTypes.string,
  navigate: PropTypes.func.isRequired,
}
Teleport.propTypes = {
  context: PropTypes.string,
  href: PropTypes.string,
  goTo: PropTypes.bool,
  raw: PropTypes.bool,
}
