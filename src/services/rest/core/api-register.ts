import { Context } from '@nuxt/types'
import { authApi, userApi, fileApi, urlApi, reviewApi, scraperApi, bookmarkApi } from '@/services/rest/api'

export default function ({ app }: Context) {
  app.$api.rest = {
    auth: authApi(app as Context, app.$appAxios),
    user: userApi(app.$appAxios),
    file: fileApi(app.$appAxios),
    url: urlApi(app.$appAxios, app),
    review: reviewApi(app.$appAxios, app),
    scraper: scraperApi(app.$appAxios, app),
    bookmark: bookmarkApi(app.$appAxios)
  }
}
