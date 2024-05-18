import { UserInformationTypes } from '@/types'

export type RegisterTypes = {
  email: string
  username: string
  password: string | number
}

export type UpdateMeTypes = {
  avatar?: number | null // File id
  username: string
  email: string
  password: string | number
  confirmPassword: string | number
  information?: UserInformationTypes
}

export type AuthApiTypes = {
  register: Function
  fetchGoogleUser: Function
  fetchMe: Function
  updateMe: Function
}
