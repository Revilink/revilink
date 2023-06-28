import { FileApiTypes, UploadFileTypes } from './file.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'

export const fileApi = (appAxios: Function) =>
  <FileApiTypes>{
    async uploadFile(params: UploadFileTypes) {
      const { formData } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: `upload`,
        data: formData
      })

      if (data) {
        return {
          data
        }
      } else {
        return { error }
      }
    }
  }
