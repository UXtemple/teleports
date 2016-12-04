import canUseDOM from './can-use-dom.js'
import getDimensions from './get-dimensions.js'

export default listener => {
  const wrappedListener = () => {
    listener(getDimensions())
  }

  if (canUseDOM) {
    window.addEventListener('orientationchange', wrappedListener, false)
    window.addEventListener('resize', wrappedListener, false)

    return () => {
      window.removeEventListener('orientationchange', wrappedListener)
      window.removeEventListener('resize', wrappedListener)
    }
  } else {
    // TODO orientation change on native
    // https://github.com/facebook/react-native/issues/25#issuecomment-247845126
    return () => {
    }
  }
}
