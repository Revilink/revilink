import { UserInformationTypes } from '@/types'

export type RegisterTypes = {
  email: string
  username: string
  password: string | number
}

export type UpdateUserTypes = {
  id: number
  avatar?: number | null // File id
  username: string
  information?: UserInformationTypes
}

export type AuthApiTypes = {
  register: Function
  fetchMe: Function
  updateUser: Function
}
