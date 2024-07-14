import { StateTypes } from './types'

export default {
  isOpenLinkCollectionsDialog(state: StateTypes) {
    return state.linkCollectionsDialog.isOpen
  },
  selectedLink(state: StateTypes) {
    return state.selectedLink
  },
  linkCollection(state: StateTypes) {
    return state.linkCollection
  },
  linkCollectionLinks(state: StateTypes) {
    return state.linkCollectionLinks
  }
}
