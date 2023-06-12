import { StateTypes } from './types'
import { ReviewTypes } from '@/types'

export default {
  SET_REVIEWS(state: StateTypes, items: Array<ReviewTypes>) {
    state.items = items
  },

  UNSHIFT_REVIEW(state: StateTypes, review: ReviewTypes) {
    state.items.unshift(review)
  },

  DELETE_REVIEW(state: StateTypes, id: number) {
    state.items = state.items.filter(obj => obj.id !== id)
  },

  EDIT_REVIEW(state: StateTypes, params: { id: number; review: ReviewTypes }) {
    const { id, review } = params

    state.items = state.items.map(obj => (obj.id === id ? { ...obj, content: review.content } : obj))
  },

  SET_META(state: StateTypes, meta: Object) {
    state.meta = meta
  }
}
