import { AuthApiTypes, RegisterTypes, UpdateUserTypes } from './auth.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { userTransformer } from '@/services/rest/transformers'

export const authApi = (appAxios: Function) =>
  <AuthApiTypes>{
    async register(params: RegisterTypes) {
      const { email, username, password } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: 'auth/local/register',
        data: {
          email,
          username,
          password
        }
      })

      return {
        data,
        error
      }
    },

    async fetchMe() {
      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: 'users/me?populate=avatar,information'
      })

      if (data) {
        return {
          data: userTransformer(data)
        }
      } else {
        return { error }
      }
    },

    async updateUser(params: UpdateUserTypes) {
      const { id, avatar, username, information } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `users/${id}?populate=avatar,information`,
        data: {
          avatar,
          username,
          information
        }
      })

      if (data) {
        return {
          data: userTransformer(data)
        }
      } else {
        return { error }
      }
    }
  }
