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
}
