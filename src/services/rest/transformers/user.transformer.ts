import { UserApiModelTypes, UserTypes } from '@/types'
import { mediaTransformer } from '@/services/rest/transformers'

export default (model: UserApiModelTypes) => {
  return <UserTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    email: model.attributes?.email || model.email,
    username: model.attributes?.username || model.username,
    avatar: model.attributes?.avatar?.data || model.avatar ? mediaTransformer(model.attributes?.avatar.data || model.avatar) : null,
    confirmed: model.attributes?.confirmed || model.confirmed,
    blocked: !!(model.attributes?.blocked || model.blocked),
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
