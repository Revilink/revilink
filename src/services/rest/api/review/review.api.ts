import {
  FetchReviewsTypes,
  FetchRepliesTypes,
  ReviewApiTypes,
  PostReviewTypes,
  EditReviewTypes,
  DeleteReviewTypes
} from './review.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { reviewsTransformer, reviewTransformer, replyTransformer } from '@/services/rest/transformers'
import { ReplyApiModelTypes } from '@/types'

export const reviewApi = (appAxios: Function) =>
  <ReviewApiTypes>{
    async fetchReviews(params: FetchReviewsTypes) {
      const { url } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: 'search',
        query: {
          url
        }
      })

      if (data) {
        return { data: reviewsTransformer(data.data) }
      } else {
        return { error }
      }
    },

    async fetchReview(id: number) {
      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `reviews/${id}`
      })

      if (data) {
        return reviewTransformer(data)
      }
    },

    async fetchReplies(params: FetchRepliesTypes) {
      const { reviewId, page = 1, limit = 0 } = params

      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `replies`,
        query: {
          reviewId,
          _page: page,
          _limit: limit
        }
      })

      if (data) {
        return data.map((item: ReplyApiModelTypes) => replyTransformer(item))
      }
    },

    async postReview(params: PostReviewTypes) {
      const { url, content, media } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `comments`,
        data: {
          data: {
            url,
            comment: content,
            images: media
          }
        }
      })

      if (data) {
        return { data }
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
        return { data }
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
        return { data }
      } else {
        return { error }
      }
    }
  }
