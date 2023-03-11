import { ReplyApiModelTypes, ReplyTypes } from '@/types'

export default (model: ReplyApiModelTypes) => {
  return <ReplyTypes>{
    id: model.id,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    url: model.link,
    isAnonymous: model.isAnonymous,
    user: model.user,
    content: model.content,
    likeCount: model.likeCount
  }
}
