import type { BookmarkApiModelTypes, BookmarkTypes } from '@/types'
import { urlTransformer } from '@/services/rest/transformers'

export default (model: BookmarkApiModelTypes) => {
  return <BookmarkTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    url: model.attributes?.url ? urlTransformer(model.attributes.url.data) : urlTransformer(model.url),
    description: model.attributes?.description || model.description
  }
}
