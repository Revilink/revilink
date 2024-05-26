import { UserInformationTypes } from '@/types'

export type RegisterTypes = {
  email: string
  username: string
  password: string
}

export type UpdateMeTypes = {
  avatar?: number | null // File id
  username: string
  email: string
  password: string
  confirmPassword: string
  information?: UserInformationTypes
}

export type ForgotPasswordTypes = {
  email: string
}

export type ResetPasswordTypes = {
  code: string
  password: string
  passwordConfirmation: string
}

export type AuthApiTypes = {
  register: Function
  fetchGoogleUser: Function
  fetchGoogleProfilePhoto: Function
  fetchMe: Function
  updateMe: Function
  forgotPassword: Function
  resetPassword: Function
}
