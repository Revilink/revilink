type AvatarTypes = {
  id: number
  data?: Record<string, any>
  attributes?: Record<string, any>
}

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
  avatar: AvatarTypes
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
  avatar: AvatarTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}
