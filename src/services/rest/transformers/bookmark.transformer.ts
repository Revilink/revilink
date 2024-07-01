import type { BookmarkApiModelTypes, BookmarkTypes, BookmarksCollectionApiModelTypes, BookmarksCollectionTypes } from '@/types'
import { urlTransformer, bookmarksCollectionTransformer } from '@/services/rest/transformers'

export default (model: BookmarkApiModelTypes): BookmarkTypes => {
  return {
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    url: model.attributes?.url ? urlTransformer(model.attributes.url.data) : urlTransformer(model.url),
    description: model.attributes?.description || model.description,
    bookmarksCollection: model.attributes?.bookmarksCollection?.data
      ? bookmarksCollectionTransformer(model.attributes.bookmarksCollection.data as BookmarksCollectionApiModelTypes)
      : model.bookmarksCollection
      ? bookmarksCollectionTransformer(model.bookmarksCollection as BookmarksCollectionApiModelTypes)
      : ({} as BookmarksCollectionTypes)
  }
}
