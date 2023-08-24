import { ActionContext } from 'vuex'
import { StateTypes } from './types'
import { ApiQueryTypes } from '@/services/rest/core/core.types'

export default {
  /* @ts-ignore */
  async fetchReviews({ commit }: ActionContext<StateTypes, StateTypes>, params: ApiQueryTypes) {
    const { populate, filters, pagination } = params

    /* @ts-ignore */
    const { data, error } = await this.$api.rest.review.fetchReviews({
      populate,
      filters,
      pagination
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
