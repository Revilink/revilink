import { UserApiModelTypes, UserTypes } from './user.types'

export type ReviewApiModelTypes = {
  id: number
  createdDate: string
  link: string
  isAnonymous: boolean
  user: UserApiModelTypes
  content: string
  likeCount: number
  replyCount: number
  comments: ReviewApiModelTypes[]
}

export type ReviewTypes = {
  id: number
  createdDate: string
  url: string
  isAnonymous: boolean
  user: UserTypes
  content: string
  likeCount: number
  replyCount: number
  comments: ReviewTypes[]
}
