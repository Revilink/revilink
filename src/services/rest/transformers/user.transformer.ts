import { UserApiModelTypes, UserTypes } from '@/types'

const avatarTransformer = (model: Record<string, any>) => {
  return model
    ? {
        ...(model.attributes || model),
        id: model.id
      }
    : null
}

export default (model: UserApiModelTypes) => {
  return <UserTypes>{
    id: model.id,
    username: model.attributes?.username || model.username,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    email: model.attributes?.email || model.email,
    avatar: model.attributes?.avatar?.data || model.avatar ? avatarTransformer(model.attributes?.avatar.data || model.avatar) : null,
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
