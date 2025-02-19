import type { LinkCollectionLinkApiModelTypes, LinkCollectionLinkTypes, LinkCollectionApiModelTypes, LinkCollectionTypes } from '@/types'
import { urlTransformer, linkCollectionTransformer, mediaTransformer } from '@/services/rest/transformers'

export default (model: LinkCollectionLinkApiModelTypes): LinkCollectionLinkTypes => {
  return {
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    url: model.attributes?.url ? urlTransformer(model.attributes.url.data) : urlTransformer(model.url),
    media: model.attributes?.media?.data || model.media ? mediaTransformer(model.attributes?.media.data || model.media) : null,
    description: model.attributes?.description || model.description,
    linkCollection: model.attributes?.linkCollection?.data
      ? linkCollectionTransformer(model.attributes.linkCollection.data as LinkCollectionApiModelTypes)
      : model.linkCollection
      ? linkCollectionTransformer(model.linkCollection as LinkCollectionApiModelTypes)
      : ({} as LinkCollectionTypes)
  }
}
