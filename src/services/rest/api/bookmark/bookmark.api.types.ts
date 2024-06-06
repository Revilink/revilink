import type { ApiQueryTypes } from '@/services/rest/core/core.types'
import type { UserTypes } from '@/types'

export interface FetchBookmarksCollectionsTypes extends ApiQueryTypes {}
export interface FetchBookmarksCollectionTypes extends ApiQueryTypes {
  id: number
}
export interface PostBookmarksCollectionTypes extends ApiQueryTypes {
  title: string
  description: string
  users: UserTypes[]
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
  fetchBookmarks: Function
  postBookmark: Function
}
