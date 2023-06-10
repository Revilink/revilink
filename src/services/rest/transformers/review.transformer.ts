import { ReviewApiModelTypes, ReviewTypes } from '@/types'

export default (model: ReviewApiModelTypes) => {
  return <ReviewTypes>{
    id: model.id,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    url: model.link,
    user: model.user,
    content: model.comment,
    likeCount: model.likeCount,
    replyCount: model.replyCount
  }
}
