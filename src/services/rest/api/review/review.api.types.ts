import { ApiQueryTypes } from '@/services/rest/core/core.types'

export interface FetchReviewsTypes extends ApiQueryTypes {}

export type FetchRepliesTypes = {
  reviewId: number
  page: number
  limit: number
}

export interface PostReviewTypes {
  url: string
  content: string
  media: Array<string> | null
}

export interface EditReviewTypes extends PostReviewTypes {
  id: number
}

export type DeleteReviewTypes = {
  id: number
}

export type ReviewApiTypes = {
  fetchReviews: Function
  fetchReview: Function
  fetchReplies: Function
  postReview: Function
  editReview: Function
  deleteReview: Function
}
