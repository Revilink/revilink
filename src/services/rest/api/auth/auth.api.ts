import { AuthApiTypes, RegisterTypes, UpdateMeTypes } from './auth.api.types'
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

    async fetchGoogleUser(token: string) {
      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: `auth/google/callback?access_token=${token}`
      })

      if (data) {
        return {
          data
        }
      } else {
        return { error }
      }
    },

    async fetchMe() {
      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        path: 'users/me'
      })

      if (data) {
        return {
          data: userTransformer(data)
        }
      } else {
        return { error }
      }
    },

    async updateMe(params: UpdateMeTypes) {
      const { avatar, username, email, password, confirmPassword, information } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'put',
        path: `users/me`,
        data: {
          avatar,
          username,
          email,
          password,
          confirmPassword,
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
