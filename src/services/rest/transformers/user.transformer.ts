import { UserApiModelTypes, UserTypes } from '@/types'

export default (model: UserApiModelTypes) => {
  return <UserTypes>{
    id: model.id,
    createdAt: model.createdAt,
    name: model.name,
    email: model.email,
    avatar: model.avatar
  }
}
