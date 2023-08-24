export type ReactionCountTypes = {
  heart?: number
  bookmark?: number
  smile?: number
  wow?: number
  thinking?: number
  angry?: number
}

export type UrlApiModelTypes = {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  url: string
  urlRaw: string
  reactionCount?: ReactionCountTypes
  myReaction?: Object
}

export type UrlTypes = {
  id: number
  createdAt: Date | string
  updatedAt?: Date | string
  url: string
  urlRaw: string
  reactionCount?: ReactionCountTypes
  myReaction?: Object
}
