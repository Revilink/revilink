import { ActionContext } from 'vuex'
import { StateTypes } from './types'

export default {
  /* @ts-ignore */
  async fetchReviews({ commit }: ActionContext<StateTypes, StateTypes>, params: { url: string }) {
    const { url } = params

    /* @ts-ignore */
    const { data, error } = await this.$api.rest.review.fetchReviews({ url })

    if (data) {
      commit('SET_REVIEWS', data.comments)

      return { data }
    } else {
      return { error }
    }
  }
}
