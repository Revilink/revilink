import { FetchReviewsTypes, ReviewApiTypes, PostReviewTypes, EditReviewTypes, DeleteReviewTypes } from './review.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { reviewTransformer } from '@/services/rest/transformers'
import { ReviewApiModelTypes } from '@/types'

export const reviewApi = (appAxios: Function) =>
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
        path: `comments/${id}?populate=parent,url,images,user`
      })

      if (data) {
        return {
          data: {
            item: reviewTransformer(data.data)
          }
        }
      } else {
        return { error }
      }
    },

    async postReview(params: PostReviewTypes) {
      const { parent, url, content, media } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `comments`,
        data: {
          data: {
            parent,
            url,
            comment: content,
            images: media
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

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `comments/${id}`,
        data: {
          data: {
            url,
            comment: content,
            images: media
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
    }
  }
