import { ReviewApiModelTypes, ReviewTypes } from '@/types'

export default (model: ReviewApiModelTypes) => {
  return <ReviewTypes>{
    id: model.id,
    createdAt: model.createdAt,
    url: model.link,
    isAnonymous: model.isAnonymous,
    user: model.user,
    content: model.content,
    likeCount: model.likeCount,
    replyCount: model.replyCount
  }
}
