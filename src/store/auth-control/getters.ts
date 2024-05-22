import { StateTypes } from './types'

export default {
  isOpenLoginDialog(state: StateTypes) {
    return state.loginDialog.isOpen
  }
}
