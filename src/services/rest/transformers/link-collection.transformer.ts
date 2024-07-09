import { LinkCollectionLinkApiModelTypes, LinkCollectionApiModelTypes, LinkCollectionTypes, UserApiModelTypes } from '@/types'
import { userTransformer, linkCollectionLinkTransformer } from '@/services/rest/transformers'

export default (model: LinkCollectionApiModelTypes) => {
  return <LinkCollectionTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    title: model.attributes?.title || model.title,
    slug: model.attributes?.slug || model.slug,
    description: model.attributes?.description || model.description,
    privacy: model.attributes?.privacy || model.privacy,
    users:
      model.attributes?.users?.data && model.attributes.users.data.length > 0
        ? model.attributes.users.data.map((user: UserApiModelTypes) => userTransformer(user))
        : model.users && model.users.length > 0
        ? model.users.map((user: UserApiModelTypes) => userTransformer(user))
        : [],
    linkCollectionLinkCount: model.attributes?.linkCollectionLinkCount || model.linkCollectionLinkCount,
    linkCollectionLinks:
      model.attributes?.linkCollectionLinks?.data?.attributes && model.attributes.linkCollectionLinks.data.attributes.length > 0
        ? model.attributes.linkCollectionLinks.data.attributes.map((link: LinkCollectionLinkApiModelTypes) =>
            linkCollectionLinkTransformer(link)
          )
        : model.linkCollectionLinks && model.linkCollectionLinks.length > 0
        ? model.linkCollectionLinks.map((linkCollectionLink: LinkCollectionLinkApiModelTypes) =>
            linkCollectionLinkTransformer(linkCollectionLink)
          )
        : []
  }
}
