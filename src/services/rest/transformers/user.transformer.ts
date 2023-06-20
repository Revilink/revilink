import { UserApiModelTypes, UserTypes } from '@/types'

export default (model: UserApiModelTypes) => {
  return <UserTypes>{
    id: model.id,
    username: model.attributes?.username || model.username,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    name: model.attributes?.name || model.name,
    email: model.attributes?.email || model.email,
    avatar: model.attributes?.avatar || model.avatar,
    confirmed: model.attributes?.confirmed || model.confirmed,
    blocked: model.attributes?.blocked || model.blocked,
    provider: model.attributes?.provider || model.provider,
    information:
      model.attributes?.information || model.information
        ? {
            id: model.attributes?.information?.id || model.information?.id,
            fullname: model.attributes?.information?.fullname || model.information?.fullname,
            bio: model.attributes?.information?.bio || model.information?.bio
          }
        : null
  }
}
