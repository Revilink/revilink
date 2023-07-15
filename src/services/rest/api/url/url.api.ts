import type { NuxtAppOptions } from '@nuxt/types'
import type { UrlApiTypes, FetchUrlTypes, PostReactionTypes, UpdateReactionTypes } from './url.api.types'
import { urlTransformer, urlReactionTransformer } from '@/services/rest/transformers'
import { AppAxiosType } from '@/services/rest/core/core.types'

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
            item: urlTransformer(data.data[0]),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async postReaction(params: PostReactionTypes) {
      const { type, urlId } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `url-reactions`,
        data: {
          data: {
            type,
            url: urlId,
            user: app.$auth.user?.id
          }
        }
      })

      if (data) {
        return {
          data: urlReactionTransformer(data.data)
        }
      } else {
        return { error }
      }
    },

    async updateReaction(params: UpdateReactionTypes) {
      const { id, type, urlId } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `url-reactions/${id}`,
        data: {
          data: {
            type,
            url: urlId,
            user: app.$auth.user?.id
          }
        }
      })

      if (data) {
        return {
          data: urlReactionTransformer(data.data)
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
