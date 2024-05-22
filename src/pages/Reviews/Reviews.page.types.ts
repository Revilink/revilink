export interface CommentRefTypes extends HTMLElement {
  clearForm(): void
  focus(): void
}

export type UrlTypes = {
  id?: number
  url?: string
}

type MyReactionTypes = {
  id?: number
  type?: string
}

export type ReactionTypes = {
  isBusy: boolean
  busyReactionIndex: number | null
  reactionCount?: Record<string, number>
  myReaction: MyReactionTypes
}
