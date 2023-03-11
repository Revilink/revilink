import { UserApiModelTypes, UserTypes } from './user.types'

export type ReplyApiModelTypes = {
  id: number
  reviewId: number
  createdAt: string
  updatedAt?: string
  link: string
  isAnonymous: boolean
  user: UserApiModelTypes
  content: string
  likeCount: number
}

export type ReplyTypes = {
  id: number
  reviewId: number
  createdAt: string
  updatedAt?: string
  url: string
  isAnonymous: boolean
  user: UserTypes
  content: string
  likeCount: number
}
