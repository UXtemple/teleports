import canUseDOM from './can-use-dom.js'
import { Dimensions } from 'react-native'

export default () => (
  canUseDOM ? {
    height: Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0),
    width: Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0)
  } : Dimensions.get('window')
)
