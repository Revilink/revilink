import type {
  BookmarkApiTypes,
  FetchBookmarksCollectionsTypes,
  FetchBookmarksCollectionTypes,
  PostBookmarksCollectionTypes,
  UpdateBookmarksCollectionTypes,
  DeleteBookmarksCollectionTypes,
  FetchBookmarksTypes,
  PostBookmarkTypes
} from './bookmark.api.types'
import type { BookmarksCollectionApiModelTypes, BookmarkApiModelTypes } from '@/types'
import { bookmarkTransformer, bookmarksCollectionTransformer } from '@/services/rest/transformers'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { encodeBase64 } from '@/utils/encode-decode'

export const bookmarkApi = (appAxios: Function) =>
  <BookmarkApiTypes>{
    async fetchBookmarksCollections(params: FetchBookmarksCollectionsTypes) {
      const { populate, filters } = params

      const queryDefault = {
        populate: 'populate=users.avatar',
        filters: ''
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `bookmarks-collections?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            items: data.data.map((item: BookmarksCollectionApiModelTypes) => bookmarksCollectionTransformer(item)),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async fetchBookmarksCollection(params: FetchBookmarksCollectionTypes) {
      const { id, populate, filters } = params

      const queryDefault = {
        populate: 'populate=users.avatar,bookmarks.url',
        filters: ''
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `bookmarks-collections/${id}?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            data: bookmarksCollectionTransformer(data.data),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async postBookmarksCollection(params: PostBookmarksCollectionTypes) {
      const { title, description, users } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `bookmarks-collections`,
        data: {
          data: {
            title,
            description,
            users
          }
        }
      })

      if (data) {
        return { data: bookmarksCollectionTransformer(data) }
      } else {
        return { error }
      }
    },

    async updateBookmarksCollection(params: UpdateBookmarksCollectionTypes) {
      const { id, title, description, users, privacy } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `bookmarks-collections/${id}`,
        data: {
          data: {
            title,
            description,
            users,
            privacy
          }
        }
      })

      if (data) {
        return { data: bookmarksCollectionTransformer(data) }
      } else {
        return { error }
      }
    },

    async deleteBookmarksCollection(params: DeleteBookmarksCollectionTypes) {
      const { id } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'delete',
        path: `bookmarks-collections/${id}`
      })

      if (data) {
        return { data: bookmarksCollectionTransformer(data) }
      } else {
        return { error }
      }
    },

    async fetchBookmarks(params: FetchBookmarksTypes) {
      const { collectionId, populate, filters } = params

      const queryDefault = {
        populate: 'populate=url,bookmarksCollection.users.avatar',
        filters: `filters[bookmarksCollection][id][$eq]=${collectionId}`
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `bookmarks/?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            data: data.data.map((bookmark: BookmarkApiModelTypes) => bookmarkTransformer(bookmark)),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async postBookmark(params: PostBookmarkTypes) {
      const { collectionId, url, description } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `bookmarks`,
        data: {
          data: {
            bookmarksCollection: collectionId,
            url: encodeBase64(url),
            description
          }
        }
      })

      if (data) {
        return { data: bookmarkTransformer(data) }
      } else {
        return { error }
      }
    }
  }
