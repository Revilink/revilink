import { AuthApiTypes, UserApiTypes, FileApiTypes, ReviewApiTypes, ScraperApiTypes } from './rest/api'

type RestInstance = {
  auth: AuthApiTypes
  user: UserApiTypes
  file: FileApiTypes
  review: ReviewApiTypes
  scraper: ScraperApiTypes
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
