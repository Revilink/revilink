import { UrlReactionApiModelTypes, UrlReactionTypes } from '@/types'

export default (model: UrlReactionApiModelTypes) => {
  return <UrlReactionTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    type: model.attributes?.type || model.type
  }
}
