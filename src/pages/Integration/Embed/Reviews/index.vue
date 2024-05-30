<template lang="pug">
.page.embed-reviews-page(ref="rootRef")
  // Reactions
  .embed-reviews-page-reactions(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.URL_REACTIONS)")
    ReactionButtonGroup(
      :is-busy="reaction.isBusy || reviewsFetchState.pending"
      :busy-reaction-index="reaction.busyReactionIndex"
      :reaction-count="reaction.reactionCount"
      :my-reaction="reaction.myReaction"
      @on-click-reaction-button="handleReaction"
    )

  // Review List
  .embed-reviews-page-review-list
    .embed-reviews-page-review-list-head(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.COMMENT_LIST_HEAD)")
      AppIcon.embed-reviews-page-review-list-head__icon(name="uil:comment-alt-dots" color="var(--color-icon-01)" :width="28" :height="28")
      span.embed-reviews-page-review-list-head__title
        | {{ $t('general.comments') }}
        template(v-if="reviews && reviews.length > 0")
          | &nbsp;({{ reviewsMeta.pagination.total }})

    template(v-if="reviewsFetchState.pending")
      AppLoading.py-base(:title="$t('general.loadingComments')")

    template(v-else-if="reviewsFetchState.error")
      p {{ reviewsFetchState.error }}

    template(v-else)
      ReviewList(:items="reviews")

    // Pagination
    vs-pagination.my-base(
      v-if="reviews && reviews.length > 0 && reviewsMeta && Object.keys(reviewsMeta).length > 0 && reviewsMeta.pagination.pageCount > 1"
      v-model="review.page"
      :length="reviewsMeta.pagination.pageCount"
    )

  // Comment Form Section
  section.embed-reviews-page-comment-form.my-base.py-base(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.COMMENT_FORM)")
    span.embed-reviews-page-comment-form__title
      AppIcon.me-2(name="uil:comment-alt-plus" color="var(--color-icon-01)" :width="24" :height="24")
      | {{ $t('form.comment.title') }}

    CommentForm(ref="commentFormRef" :is-busy="comment.isBusy" @on-submit="handleCommentOnSubmit")

  footer.embed-reviews-page__copyright(aria-label="Powered by Revilink")

  // Login Dialog
  LoginDialog(variant="embed")
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useFetch,
  useRoute,
  useRouter,
  useStore,
  useMeta,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  nextTick,
  onBeforeUnmount
} from '@nuxtjs/composition-api'
import type { Ref, ComputedRef } from 'vue'
import type { Route } from 'vue-router'
import type { UrlTypes, ReactionTypes, CommentRefTypes } from './EmbedReviews.page.types'
import { encodeBase64 } from '@/utils/encode-decode'
import type { ReviewTypes } from '@/types'
import { convertToRevilinkFormat } from '@/utils/url'
import { useReviewsEmbed } from '@/hooks'
import { AppIcon } from '@/components/Icon'
import { ReactionButtonGroup } from '@/components/ButtonGroup'
import { ReviewList } from '@/components/List'
import { CommentForm } from '@/components/Form'
import { AppLoading } from '@/components/Loading'
import { LoginDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    AppIcon,
    ReactionButtonGroup,
    ReviewList,
    CommentForm,
    AppLoading,
    LoginDialog
  },
  setup() {
    const context = useContext()
    const route: ComputedRef<Route> = useRoute()
    const router = useRouter()
    const store = useStore()

    const { setReviewsEmbedOptions, reviewsEmbedOptionKeyEnum, getReviewsEmbedOption } = useReviewsEmbed()

    setReviewsEmbedOptions(route.value.fullPath)

    const rootRef: Ref<HTMLElement | null> = ref(null)

    // Url
    const url = ref<UrlTypes>({})

    const { fetch: urlFetch, fetchState: urlFetchState } = useFetch(async () => {
      const { data } = await context.$api.rest.url.fetchUrl({
        filters: `filters[url][$eq]=${encodeBase64(
          convertToRevilinkFormat({
            url: getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.LINK)
          })
        )}`
      })

      if (data?.item) {
        url.value = data.item
      }
    })

    // Comments
    const review = reactive({
      page: getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.PAGE)
    })
    const reviews = computed(() => store.getters['review/items'])
    const reviewsMeta = computed(() => store.getters['review/meta'])
    const comment = reactive({
      isBusy: false
    })

    const commentFormRef: Ref<CommentRefTypes | null> = ref(null)

    const { fetch: reviewsFetch, fetchState: reviewsFetchState } = useFetch(async () => {
      const { data } = await store.dispatch('review/fetchReviews', {
        populate: `populate=url,user,user.avatar,images`,
        filters: `filters[url][url][$eq]=${encodeBase64(
          convertToRevilinkFormat({
            url: getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.LINK)
          })
        )}&filters[parent][id][$notNull]=false`,
        pagination: `pagination[page]=${review.page}&pagination[pageSize]=${getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.PER_PAGE)}`
      })

      if (data.items?.length <= 0) {
        review.page = 1
      }
    })

    watch(
      () => review.page,
      async value => {
        review.page = value
        await router.push({ query: { ...route.value.query, page: String(value) } })
        await reviewsFetch()
      }
    )

    watch(
      () => getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.PAGE),
      value => {
        review.page = Number(value || 1)
      }
    )

    const handleCommentOnSubmit = async (formPayload: ReviewTypes) => {
      comment.isBusy = true

      const { data, error } = await context.$api.rest.review.postReview({
        url: convertToRevilinkFormat({
          url: getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.LINK)
        }),
        content: formPayload.content,
        media: null
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('form.comment.post.callback.success.description'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        await reviewsFetch()

        commentFormRef.value?.clearForm()

        const reviewCardDOM = rootRef.value?.querySelector(`.review-list .review-card[data-id="${data.id}"] .review-card__body`)

        reviewCardDOM?.classList.add('highlight-flash-animation')
        setTimeout(() => {
          reviewCardDOM?.classList.remove('highlight-flash-animation')
        }, 3000)
      }

      if (error) {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }

      comment.isBusy = false
    }

    // Reactions
    const reaction = reactive<ReactionTypes>({
      isBusy: false,
      busyReactionIndex: null,
      reactionCount: {},
      myReaction: {}
    })

    const setBusyReactionIndex = (index: number | null) => {
      reaction.busyReactionIndex = index
    }

    const fetchUrlReactions = async () => {
      const { data } = await context.$api.rest.url.fetchUrlReactions({
        filters: `filters[url][url][$eq]=${encodeBase64(
          convertToRevilinkFormat({
            url: getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.LINK)
          })
        )}`
      })

      if (data) {
        reaction.reactionCount = data.meta.reactionCount
        reaction.myReaction = data.meta.myReaction
      }
    }

    if (getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.URL_REACTIONS)) {
      fetchUrlReactions()
    }

    const handleReaction = async (type: string, index: number) => {
      reaction.isBusy = true
      setBusyReactionIndex(index)

      if (type === reaction.myReaction?.type) {
        const { data, error } = await context.$api.rest.url.deleteReaction(reaction.myReaction.id)

        if (data) {
          reaction.myReaction = {}

          await fetchUrlReactions()
        }

        if (error) {
          window.$nuxt.$vs.notification({
            title: error.code,
            text: error.message,
            color: 'danger',
            position: 'bottom-center',
            flat: true
          })
        }
      } else if (reaction.myReaction && Object.keys(reaction.myReaction).length > 0) {
        const { data, error } = await context.$api.rest.url.updateReaction({
          id: reaction.myReaction.id,
          urlId: url.value.id,
          type
        })

        if (data) {
          await fetchUrlReactions()
        }

        if (error) {
          window.$nuxt.$vs.notification({
            title: error.code,
            text: error.message,
            color: 'danger',
            position: 'bottom-center',
            flat: true
          })
        }
      } else {
        const { data, error } = await context.$api.rest.url.postReaction({
          url: convertToRevilinkFormat({
            url: getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.LINK)
          }),
          type
        })

        if (data) {
          url.value = data.url

          await fetchUrlReactions()
        }

        if (error) {
          window.$nuxt.$vs.notification({
            title: error.code,
            text: error.message,
            color: 'danger',
            position: 'bottom-center',
            flat: true
          })
        }
      }

      reaction.isBusy = false
      setBusyReactionIndex(null)
    }

    useMeta(() => {
      return {
        meta: [
          {
            hid: 'robots',
            name: 'robots',
            content: 'noindex,nofollow'
          }
        ]
      }
    })

    // Function to send height to parent
    const sendHeightToParent = () => {
      if (rootRef.value) {
        const height = rootRef.value.scrollHeight
        window.parent.postMessage({ type: 'revilink-reviews-embed-height', height }, '*')
      }
    }

    // Watch for changes in the root element's height
    const observeHeightChanges = () => {
      const observer = new MutationObserver(() => {
        sendHeightToParent()
      })

      if (rootRef.value) {
        observer.observe(rootRef.value, {
          childList: true,
          subtree: true,
          attributes: true
        })
      }

      return observer
    }

    onMounted(async () => {
      await nextTick()

      if (process.browser) {
        document.documentElement.classList.add('embed-document')
      }

      const observer = observeHeightChanges()
      sendHeightToParent()

      onBeforeUnmount(() => {
        observer.disconnect()
      })
    })

    return {
      rootRef,
      url,
      urlFetch,
      urlFetchState,
      review,
      reviewsFetchState,
      reviewsFetch,
      reviews,
      reviewsMeta,
      comment,
      commentFormRef,
      handleCommentOnSubmit,
      reaction,
      handleReaction,
      convertToRevilinkFormat,
      reviewsEmbedOptionKeyEnum,
      getReviewsEmbedOption
    }
  },
  head: {}
})
</script>

<style lang="scss" src="./EmbedReviews.page.scss"></style>
