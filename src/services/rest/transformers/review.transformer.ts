import { ReviewApiModelTypes, ReviewTypes } from '@/types'
import { userTransformer } from '@/services/rest/transformers'

export default (model: ReviewApiModelTypes) => {
  return <ReviewTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    parent: model.attributes?.parent?.data || model.parent,
    url: model.attributes?.url.data.attributes || model.url,
    user: model.attributes?.user || model.user ? userTransformer(model.attributes?.user.data || model.user) : null,
    content: model.attributes?.comment || model.comment,
    likeCount: model.attributes?.likeCount || model.likeCount,
    myLike: model.attributes?.myLike || model.myLike,
    replyCount: model.attributes?.replyCount || model.replyCount
  }
}
