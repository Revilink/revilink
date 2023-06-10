import { UserApiModelTypes, UserTypes } from './user.types'

export type ReplyApiModelTypes = {
  id: number
  reviewId: number
  createdAt: string
  updatedAt?: string
  link: string
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
  user: UserTypes
  content: string
  likeCount: number
}
