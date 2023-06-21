type AvatarTypes = {
  id: number
  data?: Record<string, any>
  attributes?: Record<string, any>
}

type UserInformationTypes = {
  id: number
  fullname?: string
  bio?: string
}

export type UserApiModelTypes = {
  id: number
  attributes?: Record<string, any>
  username: string
  createdAt: Date | string
  updatedAt: Date | string
  name: string
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
  name: string
  email: string
  avatar: AvatarTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}
