import { Context } from '@nuxt/types'
import { AppAxiosType } from './core.types'

const appAxios = async ({ $axios, app }: Context, params: AppAxiosType) => {
  const { method = 'get', url, path, query, data, cache, headers } = params

  $axios.onRequest(config => {
    config.headers = config.headers || {}
    config.headers.common = config.headers.common || {}

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

    return { data: promise.data, error: null }
  } catch (error: any) {
    if (error.response) {
      return {
        data: null,
        error: error.response?.data?.error
          ? {
              message: error.response?.data?.error.message,
              code: error.response?.status,
              config: error.response?.config
            }
          : {
              message: error.response?.statusText,
              code: error.response?.status,
              config: error.response?.config
            }
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
