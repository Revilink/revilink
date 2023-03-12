export type FetchRepliesTypes = {
  reviewId: number
  page: number
  limit: number
}

export type ReviewApiTypes = {
  fetchReviews: Function
  fetchReview: Function
  fetchReplies: Function
}
