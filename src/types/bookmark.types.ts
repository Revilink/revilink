import type { UserApiModelTypes, UserTypes, UrlApiModelTypes, UrlTypes } from '@/types'

export type BookmarkApiModelTypes = {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  url: UrlApiModelTypes
  description: string
}

export type BookmarkTypes = {
  id: number
  createdAt: string
  updatedAt: string
  url: UrlTypes
  description: string
}

export type BookmarksCollectionPrivacyEnumTypes = 'ME_ONLY' | 'LINK_ONLY' | 'PUBLIC'

export type BookmarksCollectionApiModelTypes = {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  title: string
  slug: string
  description: string
  privacy: BookmarksCollectionPrivacyEnumTypes
  users: UserApiModelTypes[]
  bookmarkCount: number
  bookmarks: BookmarkApiModelTypes[]
}

export type BookmarksCollectionTypes = {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  description: string
  privacy: BookmarksCollectionPrivacyEnumTypes
  users: UserTypes[]
  bookmarkCount: number
  bookmarks: BookmarkTypes[]
}
