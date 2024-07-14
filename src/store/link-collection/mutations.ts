import type { StateTypes, SelectedLinkTypes } from './types'
import type { LinkCollectionTypes, LinkCollectionLinkTypes } from '@/types'

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
  },

  SET_LINK_COLLECTION(state: StateTypes, linkCollection: LinkCollectionTypes) {
    state.linkCollection = linkCollection
  },

  SET_LINK_COLLECTION_LINKS(state: StateTypes, linkCollectionLinks: LinkCollectionLinkTypes[]) {
    state.linkCollectionLinks = linkCollectionLinks
  },

  UPDATE_LINK_COLLECTION_LINK(state: StateTypes, linkCollectionLink: LinkCollectionLinkTypes) {
    state.linkCollectionLinks = state.linkCollectionLinks.map((link: LinkCollectionLinkTypes) => {
      if (link.id === linkCollectionLink.id) {
        return linkCollectionLink
      }

      return link
    })
  },

  DELETE_LINK_COLLECTION_LINK(state: StateTypes, linkId: number) {
    const index = state.linkCollectionLinks.findIndex((link: LinkCollectionLinkTypes) => link.id === linkId)

    if (index !== -1) {
      state.linkCollectionLinks.splice(index, 1)
    }
  }
}
