import { AuthApiTypes, UserApiTypes, FileApiTypes, UrlApiTypes, ReviewApiTypes, ScraperApiTypes, LinkCollectionApiTypes } from './rest/api'

type RestInstance = {
  auth: AuthApiTypes
  user: UserApiTypes
  file: FileApiTypes
  url: UrlApiTypes
  review: ReviewApiTypes
  scraper: ScraperApiTypes
  linkCollection: LinkCollectionApiTypes
}

type ApiInstance = {
  rest: RestInstance
}

declare module '@nuxt/types' {
  interface Context {
    $api: ApiInstance
  }
}
export default (_: unknown, inject: Function) => {
  inject('api', {
    rest: <RestInstance>{}
  })
}
