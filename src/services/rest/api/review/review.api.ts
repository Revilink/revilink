import { NuxtAppOptions } from '@nuxt/types'
import {
  FetchReviewsTypes,
  ReviewApiTypes,
  PostReviewTypes,
  EditReviewTypes,
  DeleteReviewTypes,
  FetchCommentLikesTypes,
  LikeReviewTypes,
  UnLikeReviewTypes
} from './review.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { reviewTransformer } from '@/services/rest/transformers'
import { ReviewApiModelTypes } from '@/types'
import { encodeBase64 } from '@/utils/encode-decode'

export const reviewApi = (appAxios: Function, app: NuxtAppOptions) =>
  <ReviewApiTypes>{
    async fetchReviews(params: FetchReviewsTypes) {
      const { populate, filters, sort, pagination } = params

      const queryDefault = {
        populate: 'populate=*',
        filters: '',
        sort: 'sort=id:desc',
        pagination: 'pagination[page]=1&pagination[pageSize]=10'
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters,
        sort: sort || queryDefault.sort,
        pagination: pagination || queryDefault.pagination
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `comments?${query.populate}&${query.filters}&${query.sort}&${query.pagination}`
      })

      if (data) {
        return {
          data: {
            items: data.data.map((item: ReviewApiModelTypes) => reviewTransformer(item)),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async fetchReview(id: number) {
      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `comments/${id}?populate=parent,parent.comment,parent.user,parent.user.avatar,url,images,user,user.avatar`
      })

      if (data) {
        return {
          data: {
            item: reviewTransformer(data.data),
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async postReview(params: PostReviewTypes) {
      const { parent, url, content, media } = params

      const { data: deviceInfo } = await app.$api.rest.auth.getDeviceInfo()

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `comments`,
        data: {
          data: {
            parent,
            url: encodeBase64(url),
            comment: content,
            images: media,
            deviceInfo
          }
        }
      })

      if (data) {
        return { data: reviewTransformer(data) }
      } else {
        return { error }
      }
    },

    async editReview(params: EditReviewTypes) {
      const { id, url, content, media } = params

      const { data: deviceInfo } = await app.$api.rest.auth.getDeviceInfo()

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `comments/${id}`,
        data: {
          data: {
            url,
            comment: content,
            images: media,
            deviceInfo
          }
        }
      })

      if (data) {
        return { data: reviewTransformer(data) }
      } else {
        return { error }
      }
    },

    async deleteReview(params: DeleteReviewTypes) {
      const { id } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'delete',
        path: `comments/${id}`
      })

      if (data) {
        return { data: reviewTransformer(data) }
      } else {
        return { error }
      }
    },

    async fetchCommentLikes(params: FetchCommentLikesTypes) {
      const { populate, filters, sort, pagination } = params

      const queryDefault = {
        populate: 'populate=*',
        filters: '',
        sort: 'sort=id:desc',
        pagination: 'pagination[page]=1&pagination[pageSize]=10'
      }

      const query = {
        populate: populate || queryDefault.populate,
        filters: filters || queryDefault.filters,
        sort: sort || queryDefault.sort,
        pagination: pagination || queryDefault.pagination
      }

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `comment-likes?${query.populate}&${query.filters}&${query.sort}&${query.pagination}`
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

    async likeReview(params: LikeReviewTypes) {
      const { id } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `comment-likes`,
        data: {
          data: {
            comment: id,
            user: app.$auth.user?.id
          }
        }
      })

      if (data) {
        return {
          data: {
            item: data.data,
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    },

    async unlikeReview(params: UnLikeReviewTypes) {
      const { likeId } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'delete',
        path: `comment-likes/${likeId}`
      })

      if (data) {
        return {
          data: {
            item: data.data,
            meta: data.meta
          }
        }
      } else {
        return { error }
      }
    }
  }
