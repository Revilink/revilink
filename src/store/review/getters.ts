import { StateTypes } from './types'

export default {
  items(state: StateTypes) {
    return state.items
  },

  meta(state: StateTypes) {
    return state.meta
  }
}
