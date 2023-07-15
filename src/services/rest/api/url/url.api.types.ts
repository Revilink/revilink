import { ApiQueryTypes } from '@/services/rest/core/core.types'

export interface FetchUrlTypes extends ApiQueryTypes {}

export interface PostReactionTypes {
  type: string
  urlId: number
}

export interface UpdateReactionTypes extends PostReactionTypes {
  id: number
}

export type UrlApiTypes = {
  fetchUrl: Function
  postReaction: Function
  updateReaction: Function
  deleteReaction: Function
}
