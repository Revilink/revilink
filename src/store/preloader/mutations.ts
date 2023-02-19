import { StateTypes } from './types'

export default {
  HIDE(state: StateTypes) {
    state.preloader.isLoading = false
  }
}
