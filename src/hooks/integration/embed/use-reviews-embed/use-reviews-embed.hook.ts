import { computed, ref } from '@nuxtjs/composition-api'
const { getQuery } = require('ufo')

export default () => {
  const reviewsEmbedOptionKeyEnum = Object.freeze({
    LINK: 'link',
    PER_PAGE: 'perPage',
    PAGE: 'page',
    URL_REACTIONS: 'urlReactions',
    COMMENT_LIST_HEAD: 'commentListHead',
    COMMENT_FORM: 'commentForm',
    COMMENT_FORM_AVATAR: 'commentFormAvatar',
    AVATAR: 'avatar',
    COMMENT_REACTIONS: 'commentReactions',
    LIKE: 'like',
    REPLY: 'reply'
  })

  const defaultOptions = {
    [reviewsEmbedOptionKeyEnum.PAGE]: 1,
    [reviewsEmbedOptionKeyEnum.PER_PAGE]: 10,
    [reviewsEmbedOptionKeyEnum.URL_REACTIONS]: true,
    [reviewsEmbedOptionKeyEnum.COMMENT_LIST_HEAD]: true,
    [reviewsEmbedOptionKeyEnum.COMMENT_FORM]: true,
    [reviewsEmbedOptionKeyEnum.COMMENT_FORM_AVATAR]: true,
    [reviewsEmbedOptionKeyEnum.AVATAR]: true,
    [reviewsEmbedOptionKeyEnum.COMMENT_REACTIONS]: true,
    [reviewsEmbedOptionKeyEnum.LIKE]: true,
    [reviewsEmbedOptionKeyEnum.REPLY]: true
  }

  const __link = ref('')

  const setReviewsEmbedOptions = (link: string) => {
    __link.value = link
  }

  const reviewsEmbedOptions = computed(() => {
    const query = getQuery(__link.value)

    Object.keys(query).forEach(key => {
      if (query[key] === 'true') {
        query[key] = true
      } else if (query[key] === 'false') {
        query[key] = false
      }
    })

    return { ...defaultOptions, ...query }
  })

  const getReviewsEmbedOption = (key: string) => {
    return reviewsEmbedOptions.value[key]
  }

  return {
    reviewsEmbedOptionKeyEnum,
    setReviewsEmbedOptions,
    reviewsEmbedOptions,
    getReviewsEmbedOption
  }
}
