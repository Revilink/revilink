import { ReviewApiModelTypes, ReviewTypes } from './review.types'

export type ReviewsApiModelTypes = {
  id: number
  createdAt: string
  updatedAt?: string
  url: string
  comments: Array<ReviewApiModelTypes> | [] | null
}

export type ReviewsTypes = {
  id: number
  createdAt: string
  updatedAt?: string
  url: string
  comments: Array<ReviewTypes> | [] | null
}
