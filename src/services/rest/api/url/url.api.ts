import type { NuxtAppOptions } from '@nuxt/types'
import type { UrlApiTypes, FetchUrlTypes, FetchUrlReactionsTypes, PostReactionTypes, UpdateReactionTypes } from './url.api.types'
import { urlTransformer, urlReactionTransformer } from '@/services/rest/transformers'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { encodeBase64 } from '@/utils/encode-decode'

export const urlApi = (appAxios: Function, app: NuxtAppOptions) =>
  <UrlApiTypes>{
    async fetchUrl(params: FetchUrlTypes) {
      const { populate, filters } = params

      const queryDefault = {
        populate: 'populate=',
        filters: ''
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `urls?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            item: data.data[0] ? urlTransformer(data.data[0]) : data.data,
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async fetchUrlReactions(params: FetchUrlReactionsTypes) {
      const { populate, filters } = params

      const queryDefault = {
        populate: 'populate=',
        filters: ''
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `url-reactions?${query.populate}&${query.filters}`
      })

      if (data) {
        return {
          data: {
            items: data.data,
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async postReaction(params: PostReactionTypes) {
      const { url, type } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `url-reactions`,
        data: {
          data: {
            url: encodeBase64(url),
            type,
            user: app.$auth.user?.id
          }
        }
      })

      if (data) {
        return {
          data: urlReactionTransformer(data)
        }
      } else {
        return { error }
      }
    },

    async updateReaction(params: UpdateReactionTypes) {
      const { id, urlId, type } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `url-reactions/${id}`,
        data: {
          data: {
            url: urlId,
            type,
            user: app.$auth.user?.id
          }
        }
      })

      if (data) {
        return {
          data: urlReactionTransformer(data)
        }
      } else {
        return { error }
      }
    },

    async deleteReaction(id: number) {
      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'delete',
        path: `url-reactions/${id}`
      })

      if (data) {
        return {
          data: urlReactionTransformer(data.data)
        }
      } else {
        return { error }
      }
    }
  }
