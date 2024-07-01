import type { UserApiModelTypes, UserTypes, UrlApiModelTypes, UrlTypes } from '@/types'

export type BookmarksCollectionPrivacyEnumTypes = 'ME_ONLY' | 'LINK_ONLY' | 'PUBLIC'

// Ortak temel tip
export type BaseBookmarksCollectionTypes = {
  id: number
  title: string
  slug: string
  description: string
  privacy: BookmarksCollectionPrivacyEnumTypes
  bookmarkCount: number
}

export type BookmarkApiModelTypes = {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  url: UrlApiModelTypes
  description: string
  bookmarksCollection: BaseBookmarksCollectionTypes
}

export type BookmarkTypes = {
  id: number
  createdAt: string
  updatedAt: string
  url: UrlTypes
  description: string
  bookmarksCollection: BaseBookmarksCollectionTypes
}

export type BookmarksCollectionApiModelTypes = BaseBookmarksCollectionTypes & {
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  users: UserApiModelTypes[]
  bookmarks: BookmarkApiModelTypes[]
}

export type BookmarksCollectionTypes = BaseBookmarksCollectionTypes & {
  createdAt: string
  updatedAt: string
  users: UserTypes[]
  bookmarks: BookmarkTypes[]
}
