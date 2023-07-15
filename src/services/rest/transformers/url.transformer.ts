import { UrlApiModelTypes, UrlTypes } from '@/types'

export default (model: UrlApiModelTypes) => {
  return <UrlTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    url: model.attributes?.url || model.url,
    urlRaw: model.attributes?.urlRaw || model.urlRaw,
    reactionCount: model.attributes?.reactionCount || model.reactionCount,
    myReaction: model.attributes?.myReaction || model.myReaction
  }
}
