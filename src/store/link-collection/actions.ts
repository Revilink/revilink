import { ActionContext } from 'vuex'
import {
  StateTypes,
  FetchLinkCollectionParamsTypes,
  FetchLinkCollectionLinksParamsTypes,
  UpdateLinkCollectionLinkParamsTypes,
  DeleteLinkCollectionLinkParamsTypes
} from './types'

export default {
  async fetchLinkCollection({ commit }: ActionContext<StateTypes, StateTypes>, params: FetchLinkCollectionParamsTypes) {
    const { id } = params

    const { data, error } = await (this as any).$api.rest.bookmark.fetchBookmarksCollection({ id })

    if (data) {
      commit('SET_LINK_COLLECTION', data.data)
    }

    if (error) {
      throw new Error(error.message)
    }
  },

  async fetchLinkCollectionLinks({ commit }: ActionContext<StateTypes, StateTypes>, params: FetchLinkCollectionLinksParamsTypes) {
    const { collectionId } = params

    const { data, error } = await (this as any).$api.rest.bookmark.fetchBookmarks({ collectionId })

    if (data) {
      commit('SET_LINK_COLLECTION_LINKS', data.data)
    }

    if (error) {
      throw new Error(error.message)
    }
  },

  async updateLinkCollectionLink({ commit }: ActionContext<StateTypes, StateTypes>, params: UpdateLinkCollectionLinkParamsTypes) {
    const { id, collectionId, url, description } = params

    const { data, error } = await (this as any).$api.rest.bookmark.updateBookmark({ id, collectionId, url, description })

    if (data) {
      commit('UPDATE_LINK_COLLECTION_LINK', data)

      return {
        data
      }
    }

    if (error) {
      return {
        error
      }
    }
  },

  async deleteLinkCollectionLink({ commit }: ActionContext<StateTypes, StateTypes>, params: DeleteLinkCollectionLinkParamsTypes) {
    const { id } = params

    const { data, error } = await (this as any).$api.rest.bookmark.deleteBookmark({ id })

    if (data) {
      commit('DELETE_LINK_COLLECTION_LINK', data.id)

      return {
        data
      }
    }

    if (error) {
      return {
        error
      }
    }
  }
}
