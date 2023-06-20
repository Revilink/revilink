import { Context } from '@nuxt/types'
import { authApi, userApi, reviewApi, scraperApi } from '@/services/rest/api'

export default function ({ app }: Context) {
  app.$api.rest = {
    auth: authApi(app.$appAxios),
    user: userApi(app.$appAxios),
    review: reviewApi(app.$appAxios),
    scraper: scraperApi(app.$appAxios)
  }
}
