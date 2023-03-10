import { ReviewApiTypes } from './review.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { reviewTransformer } from '@/services/rest/transformers'
import { ReviewApiModelTypes } from '@/types'

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
    }
  }
