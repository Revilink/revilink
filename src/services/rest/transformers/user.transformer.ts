import { UserApiModelTypes, UserTypes } from '@/types'

export default (model: UserApiModelTypes) => {
  return <UserTypes>{
    id: model.id,
    username: model.username,
    createdAt: model.createdAt,
    name: model.name,
    email: model.email,
    avatar: model.avatar
  }
}
