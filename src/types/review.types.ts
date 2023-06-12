import { UserApiModelTypes, UserTypes } from './user.types'

export type ReviewApiModelTypes = {
  id: number
  attributes?: any
  createdAt: string
  updatedAt?: string
  url: string
  user: UserApiModelTypes
  comment: string
  likeCount: number
  replyCount: number
}

export type ReviewTypes = {
  id: number
  createdAt: string
  updatedAt?: string
  url: string
  user: UserTypes
  content: string
  likeCount: number
  replyCount: number
}
