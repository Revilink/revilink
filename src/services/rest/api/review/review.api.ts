import { FetchRepliesTypes, ReviewApiTypes } from './review.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { reviewTransformer, replyTransformer } from '@/services/rest/transformers'
import { ReviewApiModelTypes, ReplyApiModelTypes } from '@/types'

export const reviewApi = (appAxios: Function) =>
  <ReviewApiTypes>{
    async fetchReviews() {
      const { isSuccess, data } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: 'reviews'
      })

      if (isSuccess) {
        return data.map((item: ReviewApiModelTypes) => reviewTransformer(item))
      }
    },

    async fetchReview(id: number) {
      const { isSuccess, data } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `reviews/${id}`
      })

      if (isSuccess) {
        return reviewTransformer(data)
      }
    },

    async fetchReplies(params: FetchRepliesTypes) {
      const { reviewId } = params

      const { isSuccess, data } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `replies`,
        query: {
          reviewId
        }
      })

      if (isSuccess) {
        return data.map((item: ReplyApiModelTypes) => replyTransformer(item))
      }
    }
  }
