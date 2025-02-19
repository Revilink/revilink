import type { UserApiModelTypes, UserTypes, UrlApiModelTypes, UrlTypes, MediaTypes } from '@/types'

export type LinkCollectionPrivacyEnumTypes = 'ME_ONLY' | 'LINK_ONLY' | 'PUBLIC'

export type BaseLinkCollectionTypes = {
  id: number
  title: string
  slug: string
  description: string
  privacy: LinkCollectionPrivacyEnumTypes
  linkCollectionLinkCount: number
}

export type LinkCollectionLinkApiModelTypes = {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  url: UrlApiModelTypes
  media: MediaTypes
  description: string
  linkCollection: BaseLinkCollectionTypes
}

export type LinkCollectionLinkTypes = {
  id: number
  createdAt: string
  updatedAt: string
  url: UrlTypes
  media: MediaTypes | null
  description: string
  linkCollection: BaseLinkCollectionTypes
}

export type LinkCollectionApiModelTypes = BaseLinkCollectionTypes & {
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  users: UserApiModelTypes[]
  linkCollectionLinks: LinkCollectionLinkApiModelTypes[]
}

export type LinkCollectionTypes = BaseLinkCollectionTypes & {
  createdAt: string
  updatedAt: string
  users: UserTypes[]
  linkCollectionLinks: LinkCollectionLinkTypes[]
}
