// next.js Link https://github.com/zeit/next.js/blob/master/lib/link.js
// is similar in concept to our original teleport
// https://github.com/UXtemple/panels/blob/master/blocks/teleport.js
// However, theirs is a more stripped down version which doesn't really declare UI
// and that's exactly what we're after on Teleports.
import React, { Children, Component, PropTypes } from 'react'

export default class Teleport extends Component {
  linkClicked = async (e) => {
    if (e.target.nodeName === 'A' &&
      (e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent.which === 2)) {
      // ignore click for new tab / new window behavior
      return
    }

    const { goTo, href, onError } = this.props

    if (goTo) {
      // ignore click if it's outside our scope
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
    const children = Children.map(this.props.children, (child) => {
      const props = {
        onClick: this.linkClicked
      }

      const isAnchor = child && child.type === 'a'

      // if child does not specify a href, specify it
      // so that repetition is not needed by the user
      if (!isAnchor || !('href' in child.props)) {
        props.href = this.props.href
      }

      // always open a new tab on goTo
      if (this.props.goTo) {
        props.target = '_blank'
      }

      if (isAnchor) {
        return React.cloneElement(child, props)
      } else {
        return <a {...props}>{child}</a>
      }
    })

    return children[0]
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
