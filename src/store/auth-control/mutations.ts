import { StateTypes } from './types'

export default {
  OPEN_LOGIN_DIALOG(state: StateTypes) {
    state.loginDialog.isOpen = true
  },

  CLOSE_LOGIN_DIALOG(state: StateTypes) {
    state.loginDialog.isOpen = false
  },

  SET_LOGIN_DIALOG_IS_OPEN(state: StateTypes) {
    state.loginDialog.isOpen = false
  }
}
