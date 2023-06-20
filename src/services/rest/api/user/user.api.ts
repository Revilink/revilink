import { UserApiTypes, FetchUserTypes } from './user.api.types'
import { userTransformer } from '@/services/rest/transformers'
import { AppAxiosType } from '@/services/rest/core/core.types'

export const userApi = (appAxios: Function) =>
  <UserApiTypes>{
    async fetchUser(params: FetchUserTypes) {
      const { username } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `users?filters[username]=${username}&populate=information,avatar`
      })

      if (data) {
        return {
          data: userTransformer(data[0])
        }
      } else {
        return { error }
      }
    }
  }
