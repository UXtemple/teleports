import canUseDOM from './can-use-dom.js'
// TODO see if it makes sense to use the history module instead

const browser = () => ({
  back() {
    window.history.back()
  },
  forward() {
    window.history.forward()
  },
  getUri() {
    return window.location.href
  },
  onChange(listener) {
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  },
  push(uri) {
    window.history.pushState(null, null, uri)
  }
})

const memory = initialUri => {
  let current = 0
  let history = [initialUri]
  let listeners = []

  return {
    back() {
      if (current > 0) {
        current--
      }
      listeners.forEach(l => l())
    },
    forward() {
      if (current < history.length - 1) {
        current++
      }
      listeners.forEach(l => l())
    },
    getUri() {
      return history[current]
    },
    onChange(listener) {
      listeners.push(listener)
      return () => {
        listeners = listeners.filter(l => l !== listener)
      }
    },
    push(uri) {
      history = history.slice(0, current).concat(uri)
      current = history.length - 1
    }
  }
}

export default initialUri => (
  canUseDOM ? browser(initialUri) : memory(initialUri)
)
