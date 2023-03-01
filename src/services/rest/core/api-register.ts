import { Context } from '@nuxt/types'
import { reviewApi } from '@/services/rest/api'

export default function ({ app }: Context) {
  app.$api.rest = {
    review: reviewApi(app.$appAxios)
  }
}
