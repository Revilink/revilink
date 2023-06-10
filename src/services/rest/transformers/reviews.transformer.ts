import { ReviewsApiModelTypes, ReviewApiModelTypes, ReviewsTypes } from '@/types'
import { reviewTransformer } from '@/services/rest/transformers'

export default (model: ReviewsApiModelTypes) => {
  return <ReviewsTypes>{
    id: model.id,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    url: model.url,
    comments: model.comments?.map((item: ReviewApiModelTypes) => reviewTransformer(item))
  }
}
