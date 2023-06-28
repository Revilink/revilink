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
  username: string
  createdAt: Date | string
  updatedAt: Date | string
  email: string
  avatar: AvatarTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}

export type UserTypes = {
  id: number
  username: string
  createdAt: Date | string
  updatedAt: Date | string
  email: string
  avatar: AvatarTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}
