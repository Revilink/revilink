export type CommentTypes = {
  id?: number
  likeCount?: number
}

export type MyLikeTypes = {
  id?: number
}

export type LikeTypes = {
  myLike: MyLikeTypes
  isActive: boolean
  count: number
}
