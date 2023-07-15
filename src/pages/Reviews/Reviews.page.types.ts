export interface CommentRefTypes extends HTMLElement {
  clearForm(): void
  focus(): void
}

export type UrlTypes = {
  id?: number
}

type MyReactionTypes = {
  id?: number
  type?: string
}

export type ReactionTypes = {
  reactionCount?: Record<string, number>
  myReaction: MyReactionTypes
}
