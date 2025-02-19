export interface ImageUploadRefTypes extends HTMLElement {
  hasImage: () => boolean
}

export type ImageConfigTypes = {
  width: number
  height: number
  preventWhiteSpace: boolean
  showRemoveButton: boolean
  zoomSpeed: number
  accept: string
  fileSizeLimit: number
}

export interface ImageFileTypes {
  currentIsInitial?: boolean
  generateBlob?: Function
}

export type ImageUploadTypes = {
  file: ImageFileTypes
  isDirty: boolean
  config: ImageConfigTypes
}
