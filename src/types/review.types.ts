import { UserApiModelTypes, UserTypes } from './user.types'

export type ReviewApiModelTypes = {
  id: number
  attributes?: any
  createdAt: string
  updatedAt?: string
  url: Object
  user: UserApiModelTypes
  comment: string
  likeCount: number
  replyCount: number
  parent?: Object
}

export type ReviewTypes = {
  id: number
  createdAt: string
  updatedAt?: string
  url: Object
  user: UserTypes
  content: string
  likeCount: number
  replyCount: number
  parent?: Object
}
