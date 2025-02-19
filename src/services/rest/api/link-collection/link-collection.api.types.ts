import type { ApiQueryTypes } from '@/services/rest/core/core.types'
import type { UserTypes, LinkCollectionPrivacyEnumTypes, MediaApiModelTypes } from '@/types'

export interface FetchLinkCollectionsTypes extends ApiQueryTypes {}
export interface FetchLinkCollectionTypes extends ApiQueryTypes {
  id: number
}
export interface PostLinkCollectionTypes extends ApiQueryTypes {
  title: string
  description: string
  users: UserTypes[]
}

export interface UpdateLinkCollectionTypes extends PostLinkCollectionTypes {
  id: number
  privacy: LinkCollectionPrivacyEnumTypes
}

export interface DeleteLinkCollectionTypes extends ApiQueryTypes {
  id: number
}

export interface FetchLinkCollectionLinksTypes extends ApiQueryTypes {
  collectionId: number
}

export interface PostLinkCollectionLinkTypes extends ApiQueryTypes {
  collectionId: number
  url: string
  description: string
}

export interface UpdateLinkCollectionLinkTypes extends ApiQueryTypes {
  id: number
  collectionId: number
  url: number
  media: MediaApiModelTypes
  description: string
}

export interface DeleteLinkCollectionLinkTypes extends ApiQueryTypes {
  id: number
}

export type LinkCollectionApiTypes = {
  fetchLinkCollections: Function
  fetchLinkCollection: Function
  postLinkCollection: Function
  updateLinkCollection: Function
  deleteLinkCollection: Function
  fetchLinkCollectionLinks: Function
  postLinkCollectionLink: Function
  updateLinkCollectionLink: Function
  deleteLinkCollectionLink: Function
}
