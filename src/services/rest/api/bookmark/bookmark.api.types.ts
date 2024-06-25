import type { ApiQueryTypes } from '@/services/rest/core/core.types'
import type { UserTypes, BookmarksCollectionPrivacyEnumTypes } from '@/types'

export interface FetchBookmarksCollectionsTypes extends ApiQueryTypes {}
export interface FetchBookmarksCollectionTypes extends ApiQueryTypes {
  id: number
}
export interface PostBookmarksCollectionTypes extends ApiQueryTypes {
  title: string
  description: string
  users: UserTypes[]
}

export interface UpdateBookmarksCollectionTypes extends PostBookmarksCollectionTypes {
  id: number
  privacy: BookmarksCollectionPrivacyEnumTypes
}

export interface DeleteBookmarksCollectionTypes extends ApiQueryTypes {
  id: number
}

export interface FetchBookmarksTypes extends ApiQueryTypes {
  collectionId: number
}

export interface PostBookmarkTypes extends ApiQueryTypes {
  collectionId: number
  url: string
  description: string
}

export type BookmarkApiTypes = {
  fetchBookmarksCollections: Function
  fetchBookmarksCollection: Function
  postBookmarksCollection: Function
  updateBookmarksCollection: Function
  deleteBookmarksCollection: Function
  fetchBookmarks: Function
  postBookmark: Function
}
