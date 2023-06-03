import { RegisterTypes, AuthApiTypes } from './auth.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'

export const authApi = (appAxios: Function) =>
  <AuthApiTypes>{
    async register(params: RegisterTypes) {
      const { email, username, password, avatar } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: 'auth/local/register',
        data: {
          email,
          username,
          password,
          avatar
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
        path: 'users/me'
      })

      return {
        data,
        error
      }
    }
  }
