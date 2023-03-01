import { Context } from '@nuxt/types'
import { AppAxiosType } from './core.types'

const appAxios = async ({ $axios, app }: Context, params: AppAxiosType) => {
  const { method = 'get', url, path, query, data, cache, headers } = params

  $axios.onRequest(config => {
    if (config.headers.common['Content-Type']) {
      config.headers.common['Content-Type'] = 'application/json'
    }

    config.headers.common['Accept-Language'] = app.i18n.locale
  })

  try {
    const promise = await $axios(<Object>{
      method,
      url: url || `${app.$config.API}/${path}`,
      params: { ...query },
      data,
      cache,
      headers,
      config: {}
    })

    return { isSuccess: true, data: promise.data }
  } catch (error: any) {
    if (error.response) {
      throw {
        message: error.response?.statusText,
        code: error.response?.status,
        config: error.response?.config
      }
    } else {
      throw new Error(error)
    }
  }
}

export default ({ $axios, app }: Context, inject: Function) => {
  inject('appAxios', (params: AppAxiosType) => {
    return appAxios({ $axios, app } as Context, params)
  })
}
