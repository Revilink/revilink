export interface AvatarUploadRefTypes extends HTMLElement {
  hasImage: () => boolean
}

export type AvatarConfigTypes = {
  width: number
  height: number
  preventWhiteSpace: boolean
  showRemoveButton: boolean
  zoomSpeed: number
  accept: string
  fileSizeLimit: number
}

export interface AvatarFileTypes {
  currentIsInitial?: boolean
  generateBlob?: Function
}

export type AvatarTypes = {
  file: AvatarFileTypes
  isDirty: boolean
  config: AvatarConfigTypes
}
