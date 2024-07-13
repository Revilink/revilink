import type {
  LinkCollectionApiTypes,
  FetchLinkCollectionsTypes,
  FetchLinkCollectionTypes,
  PostLinkCollectionTypes,
  UpdateLinkCollectionTypes,
  DeleteLinkCollectionTypes,
  FetchLinkCollectionLinksTypes,
  PostLinkCollectionLinkTypes,
  UpdateLinkCollectionLinkTypes,
  DeleteLinkCollectionLinkTypes
} from './link-collection.api.types'
import type { LinkCollectionApiModelTypes, LinkCollectionLinkApiModelTypes } from '@/types'
import { linkCollectionLinkTransformer, linkCollectionTransformer } from '@/services/rest/transformers'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { encodeBase64 } from '@/utils/encode-decode'

export const linkCollectionApi = (appAxios: Function) =>
  <LinkCollectionApiTypes>{
    async fetchLinkCollections(params: FetchLinkCollectionsTypes) {
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
        path: `link-collections?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            items: data.data.map((item: LinkCollectionApiModelTypes) => linkCollectionTransformer(item)),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async fetchLinkCollection(params: FetchLinkCollectionTypes) {
      const { id, populate, filters } = params

      const queryDefault = {
        populate: 'populate=users.avatar,linkCollectionLinks.url',
        filters: ''
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `link-collections/${id}?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            data: linkCollectionTransformer(data.data),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async postLinkCollection(params: PostLinkCollectionTypes) {
      const { title, description, users } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `link-collections`,
        data: {
          data: {
            title,
            description,
            users
          }
        }
      })

      if (data) {
        return { data: linkCollectionTransformer(data) }
      } else {
        return { error }
      }
    },

    async updateLinkCollection(params: UpdateLinkCollectionTypes) {
      const { id, title, privacy, description, users } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `link-collections/${id}`,
        data: {
          data: {
            title,
            privacy,
            description,
            users
          }
        }
      })

      if (data) {
        return { data: linkCollectionTransformer(data) }
      } else {
        return { error }
      }
    },

    async deleteLinkCollection(params: DeleteLinkCollectionTypes) {
      const { id } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'delete',
        path: `link-collections/${id}`
      })

      if (data) {
        return { data: linkCollectionTransformer(data) }
      } else {
        return { error }
      }
    },

    async fetchLinkCollectionLinks(params: FetchLinkCollectionLinksTypes) {
      const { collectionId, populate, filters } = params

      const queryDefault = {
        populate: 'populate=url,linkCollection.users.avatar',
        filters: `filters[linkCollection][id][$eq]=${collectionId}`
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `link-collection-links/?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            data: data.data.map((link: LinkCollectionLinkApiModelTypes) => linkCollectionLinkTransformer(link)),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async postLinkCollectionLink(params: PostLinkCollectionLinkTypes) {
      const { collectionId, url, description } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `link-collection-links`,
        data: {
          data: {
            linkCollection: collectionId,
            url: encodeBase64(url),
            description
          }
        }
      })

      if (data) {
        return { data: linkCollectionLinkTransformer(data) }
      } else {
        return { error }
      }
    },

    async updateLinkCollectionLink(params: UpdateLinkCollectionLinkTypes) {
      const { id, collectionId, url, description, populate, filters } = params

      const queryDefault = {
        populate: 'populate=url,linkCollection.users',
        filters: ''
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `link-collection-links/${id}?${query.populate}&${query.filters}`,
        data: {
          data: {
            linkCollection: collectionId,
            url,
            description
          }
        }
      })

      if (data) {
        return { data: linkCollectionLinkTransformer(data.data) }
      } else {
        return { error }
      }
    },

    async deleteLinkCollectionLink(params: DeleteLinkCollectionLinkTypes) {
      const { id, populate, filters } = params

      const queryDefault = {
        populate: 'populate=url,linkCollection.users',
        filters: ''
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'delete',
        path: `link-collection-links/${id}?${query.populate}&${query.filters}`
      })

      if (data) {
        return { data: linkCollectionLinkTransformer(data.data) }
      } else {
        return { error }
      }
    }
  }
