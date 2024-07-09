import type { LinkCollectionTypes, LinkCollectionLinkTypes } from '@/types'

type LinkCollectionsDialogTypes = {
  isOpen: boolean
}

export type SelectedLinkTypes = {
  url: string
  description?: string | null
} | null

export type StateTypes = {
  linkCollectionsDialog: LinkCollectionsDialogTypes
  selectedLink: SelectedLinkTypes
  linkCollection: LinkCollectionTypes | {}
  linkCollectionLinks: LinkCollectionLinkTypes[]
}

export type FetchLinkCollectionParamsTypes = {
  id: number
}

export type FetchLinkCollectionLinksParamsTypes = {
  collectionId: number
}

export type UpdateLinkCollectionLinkParamsTypes = {
  id: number
  collectionId: number
  url?: number
  description?: string | null
}

export type DeleteLinkCollectionLinkParamsTypes = {
  id: number
}
