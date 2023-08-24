import { useContext, reactive, computed } from '@nuxtjs/composition-api'
import type { CommentTypes, LikeTypes } from './use-comment-like.hook.types'

export default (comment: CommentTypes) => {
  const context = useContext()

  const like = reactive<LikeTypes>({
    myLike: {},
    isActive: false,
    count: comment.likeCount || 0
  })

  const getMyLike = () => {
    if (context.$auth.loggedIn && context.$auth.user) {
      if (comment.myLike) {
        like.myLike = comment.myLike
        like.isActive = true
      }
    }
  }

  const toggleLike = async () => {
    like.isActive = !like.isActive

    if (like.isActive) {
      like.count += 1

      const { data, error } = await context.$api.rest.review.likeReview({ id: comment.id })

      if (data?.item) {
        // Like successfully
        like.myLike = data.item
      } else {
        like.count -= 1
        like.isActive = false

        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }
    } else {
      like.count -= 1

      const { data, error } = await context.$api.rest.review.unlikeReview({ likeId: like.myLike.id })

      if (data) {
        // Unlike successfully
        like.myLike = {}
      } else {
        like.count += 1
        like.isActive = true

        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }
    }
  }

  const likedClass = computed(() => {
    const likeButtonClassName = 'like-button'

    if (like.isActive) {
      return `${likeButtonClassName}--liked`
    }
  })

  return {
    like,
    getMyLike,
    toggleLike,
    likedClass
  }
}
