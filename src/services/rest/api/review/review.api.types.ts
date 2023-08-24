import { ApiQueryTypes } from '@/services/rest/core/core.types'
import { ReviewApiModelTypes } from '@/types'

export interface FetchReviewsTypes extends ApiQueryTypes {}

export type FetchRepliesTypes = {
  commentId: number
  page: number
  limit: number
}

export interface PostReviewTypes {
  parent: ReviewApiModelTypes
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

export interface FetchCommentLikesTypes extends ApiQueryTypes {}

export type LikeReviewTypes = {
  id: number
}

export type UnLikeReviewTypes = {
  likeId: number
}

export type ReviewApiTypes = {
  fetchReviews: Function
  fetchReview: Function
  postReview: Function
  editReview: Function
  deleteReview: Function
  fetchCommentLikes: Function
  likeReview: Function
  unlikeReview: Function
}
