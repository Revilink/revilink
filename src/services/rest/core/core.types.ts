export type AppAxiosType = {
  method: string
  url: string
  path?: string
  query?: object
  data?: object
  cache?: RequestCache
  headers?: object
}
