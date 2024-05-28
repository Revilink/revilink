import type { Context } from '@nuxt/types'
import axios from 'axios'
import { RADKOD_API_URL } from '../../../../../system/constants'
import type { AuthApiTypes, RegisterTypes, UpdateMeTypes, ForgotPasswordTypes, ResetPasswordTypes } from './auth.api.types'
import type { AppAxiosType } from '@/services/rest/core/core.types'
import { userTransformer } from '@/services/rest/transformers'

export const authApi = (app: Context, appAxios: Function) =>
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

    async fetchGoogleUser(callbackParams: string) {
      const { data } = await axios.get(`${app.$config.API}/auth/google/callback?${callbackParams}`, {
        headers: {
          Authorization: `${callbackParams}`
        }
      })

      if (data) {
        return {
          data
        }
      }
    },

    async fetchGoogleProfilePhoto({ accessToken }: { accessToken: string }) {
      const { data } = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=photos&access_token=${accessToken}`)

      if (data) {
        return {
          data
        }
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
    },

    async forgotPassword(params: ForgotPasswordTypes) {
      const { email } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: 'auth/forgot-password',
        data: {
          email
        }
      })

      if (data) {
        return {
          data
        }
      }

      if (error) {
        return {
          error
        }
      }
    },

    async resetPassword(params: ResetPasswordTypes) {
      const { code, password, passwordConfirmation } = params

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'post',
        path: 'auth/reset-password',
        data: {
          code,
          password,
          passwordConfirmation
        }
      })

      if (data) {
        return {
          data
        }
      }

      if (error) {
        return {
          error
        }
      }
    },

    async getDeviceInfo() {
      const UAParser = require('ua-parser-js')
      const parser = new UAParser(navigator.userAgent)
      const ua = parser.getResult()

      let deviceInfo = {
        ...ua
      }

      if (typeof window !== 'undefined') {
        deviceInfo = {
          ...deviceInfo,
          window: {
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight
          }
        }
      }

      if (navigator) {
        deviceInfo = {
          ...deviceInfo,
          language: navigator.language
        }
      }

      try {
        const response = await axios.get(`${RADKOD_API_URL}/global/ipinfo.php`)
        const ipData = response.data

        if (ipData) {
          deviceInfo = {
            ...deviceInfo,
            ipData
          }
        }
      } catch (error) {
        console.error('Error fetching IPData info:', error)
      }

      return {
        data: {
          deviceInfo
        }
      }
    }
  }
