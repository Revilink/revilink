import type { MediaApiModelTypes, MediaTypes } from '@/types'

export type UserInformationTypes = {
  id?: number
  fullname?: string
  bio?: string
}

export type UserApiModelTypes = {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  username: string
  email: string
  password: string
  avatar: MediaApiModelTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}

export type UserTypes = {
  id: number
  createdAt: Date | string
  updatedAt?: Date | string
  email: string
  username: string
  password: string
  avatar: MediaTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}
