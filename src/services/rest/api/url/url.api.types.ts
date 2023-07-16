import { ApiQueryTypes } from '@/services/rest/core/core.types'

export interface FetchUrlTypes extends ApiQueryTypes {}

export interface FetchUrlReactionsTypes extends ApiQueryTypes {}

export interface PostReactionTypes {
  url: string
  type: string
}

export interface UpdateReactionTypes extends PostReactionTypes {
  id: number
  urlId: number
}

export type UrlApiTypes = {
  fetchUrl: Function
  fetchUrlReactions: Function
  postReaction: Function
  updateReaction: Function
  deleteReaction: Function
}
