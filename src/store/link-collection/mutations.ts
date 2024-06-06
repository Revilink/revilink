import { StateTypes, SelectedLinkTypes } from './types'

export default {
  OPEN_LINK_COLLECTIONS_DIALOG(state: StateTypes) {
    state.linkCollectionsDialog.isOpen = true
  },

  CLOSE_LINK_COLLECTIONS_DIALOG(state: StateTypes) {
    state.linkCollectionsDialog.isOpen = false
  },

  SET_LINK_COLLECTIONS_DIALOG_IS_OPEN(state: StateTypes) {
    state.linkCollectionsDialog.isOpen = false
  },

  SET_SELECTED_LINK(state: StateTypes, selectedLink: SelectedLinkTypes) {
    state.selectedLink = selectedLink
  },

  CLEAR_SELECTED_LINK(state: StateTypes) {
    state.selectedLink = null
  }
}
