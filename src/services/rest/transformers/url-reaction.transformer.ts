import { UrlReactionApiModelTypes, UrlReactionTypes } from '@/types'
import { urlTransformer } from '@/services/rest/transformers'

export default (model: UrlReactionApiModelTypes) => {
  return <UrlReactionTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    type: model.attributes?.type || model.type,
    url: model.attributes?.url || model.url ? urlTransformer(model.attributes?.url?.data || model.url) : null
  }
}
