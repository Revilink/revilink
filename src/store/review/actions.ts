import { ActionContext } from 'vuex'
import { StateTypes } from './types'

export default {
  /* @ts-ignore */
  async fetchReviews({ commit }: ActionContext<StateTypes, StateTypes>, params: { url: string; page: number }) {
    const { url, page } = params

    /* @ts-ignore */
    const { data, error } = await this.$api.rest.review.fetchReviews({
      filters: `[url][url][$eq]=${url}`,
      pagination: `pagination[page]=${page}&pagination[pageSize]=10`
    })

    if (data) {
      commit('SET_REVIEWS', data.items)
      commit('SET_META', data.meta)

      return { data }
    } else {
      return { error }
    }
  }
}
