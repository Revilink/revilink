import { Context } from '@nuxt/types'
import { reviewApi, scraperApi } from '@/services/rest/api'

export default function ({ app }: Context) {
  app.$api.rest = {
    review: reviewApi(app.$appAxios),
    scraper: scraperApi(app.$appAxios)
  }
}
