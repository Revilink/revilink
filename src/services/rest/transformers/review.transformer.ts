import { ReviewApiModelTypes, ReviewTypes } from '@/types'
import { userTransformer } from '@/services/rest/transformers'

export default (model: ReviewApiModelTypes) => {
  return <ReviewTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    url: model.attributes?.url.data.attributes || model.url,
    user: userTransformer(model.attributes?.user.data.attributes || model.user),
    content: model.attributes?.comment || model.comment,
    likeCount: model.attributes?.likeCount || model.likeCount,
    replyCount: model.attributes?.replyCount || model.replyCount
  }
}
