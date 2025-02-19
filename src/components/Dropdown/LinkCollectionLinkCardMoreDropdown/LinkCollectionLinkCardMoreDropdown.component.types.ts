export interface ImageUploadRefTypes {
  hasImage: () => boolean
  chooseFile: () => void
}

export interface ImageUploadTypes {
  file: {
    currentIsInitial?: boolean
    generateBlob?: (callback: (blob: Blob) => void, quality: number) => void
  }
  isDirty: boolean
  config: {
    width: number
    height: number
    preventWhiteSpace: boolean
    showRemoveButton: boolean
    zoomSpeed: number
    accept: string
    fileSizeLimit: number
  }
}
