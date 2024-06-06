import { BookmarkApiModelTypes, BookmarksCollectionApiModelTypes, BookmarksCollectionTypes, UserApiModelTypes } from '@/types'
import { userTransformer, bookmarkTransformer } from '@/services/rest/transformers'

export default (model: BookmarksCollectionApiModelTypes) => {
  return <BookmarksCollectionTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    title: model.attributes?.title || model.title,
    slug: model.attributes?.slug || model.slug,
    description: model.attributes?.description || model.description,
    privacy: model.attributes?.privacy || model.privacy,
    users:
      model.attributes?.users?.data && model.attributes.users.data.length > 0
        ? model.attributes.users.data.map((user: UserApiModelTypes) => userTransformer(user))
        : model.users && model.users.length > 0
        ? model.users.map((user: UserApiModelTypes) => userTransformer(user))
        : [],
    bookmarkCount: model.attributes?.bookmarkCount || model.bookmarkCount,
    bookmarks:
      model.attributes?.bookmarks?.data?.attributes && model.attributes.bookmarks.data.attributes.length > 0
        ? model.attributes.bookmarks.data.attributes.map((bookmark: BookmarkApiModelTypes) => bookmarkTransformer(bookmark))
        : model.bookmarks && model.bookmarks.length > 0
        ? model.bookmarks.map((bookmark: BookmarkApiModelTypes) => bookmarkTransformer(bookmark))
        : []
  }
}
