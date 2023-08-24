export type AppAxiosType = {
  method: string
  url: string
  path?: string
  query?: object
  data?: object
  cache?: RequestCache
  headers?: object
}

export interface ApiQueryTypes {
  populate?: string | Object
  filters?: Object
  sort?: string | Array<unknown>
  pagination?: Object
  fields?: Array<unknown>
  publicationState?: string
  locale?: string | Array<unknown>
}
