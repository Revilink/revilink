export type CommentTypes = {
  id?: number
  likeCount?: number
  myLike?: Object
}

export type MyLikeTypes = {
  id?: number
}

export type LikeTypes = {
  myLike: MyLikeTypes
  isActive: boolean
  count: number
}
