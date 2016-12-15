import React, { Children, Component, PropTypes } from 'react'

export default class Teleport extends Component {
  onClick = async (e) => {
    const { goTo, href, onError } = this.props

    if (
      goTo ||
        (e.target.nodeName === 'A' &&
        (e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent.which === 2))
    ) {
      // ignore click for new tab / new window behavior
      return
    }

    e.preventDefault()

    // straight up redirect
    try {
      await this.context.navigate(href)
    } catch(error) {
      if (typeof onError === 'function') {
        onError(error)
      }
    }
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
Teleport.propTypes = {
  href: PropTypes.string,
  goTo: PropTypes.bool,
  onError: PropTypes.func
}
Teleport.contextTypes = {
  navigate: PropTypes.func.isRequired
}
