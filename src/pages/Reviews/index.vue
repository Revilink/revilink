<template lang="pug">
.page.reviews-page(ref="rootRef")
  .row
    .col-4
      .col-11
        span Sidebar
    .col-8
      // Site Meta
      .reviews-page-review-meta
        vs-tooltip(not-arrow shadow top :class="[{ 'pointer-events-none': site.isBusy }]")
          vs-avatar.reviews-page-review-meta__avatar(
            badge-position="top-left"
            :badge="!site.isBusy"
            :badge-color="site.isAllowed ? 'success' : '#ddd'"
          )
            img.reviews-page-review-meta__avatarSpinner(
              v-if="site.isBusy"
              src="@/assets/media/core/loader.svg"
              :alt="$t('general.avatar')"
              width="24"
              height="24"
            )
            template(v-else)
              img(v-if="site.isAllowed && site.meta.icon" :src="site.meta.icon" :alt="$t('general.avatar')" width="16" height="16")
              AppIcon(v-else name="charm:globe" color="var(--color-text-01)" :width="24" :height="24")

          template(#tooltip)
            span(v-if="site.isAllowed") {{ $t('reviews.site.meta.tooltip.allowed') }}
            span(v-else) {{ $t('reviews.site.meta.tooltip.noAllow') }}

        .reviews-page-review-meta__body
          h1.reviews-page-review-meta__title(v-if="site.isAllowed") {{ site.meta.title }}
          h4.reviews-page-review-meta__url
            AppIcon(name="material-symbols:link" color="var(--color-link-01)" :width="24" :height="24")
            a(rel="noopener,norel" :title="$route.query.link" :href="withProtocol($route.query.link, 'http://')" target="_blank")
              | {{ $route.query.link }}

      // Review List
      template(v-if="fetchState.pending")
        p loading

      template(v-else-if="fetchState.error")
        p {{ fetchState.error }}

      template(v-else)
        ReviewList(:items="reviews")

      // Pagination
      client-only
        vs-pagination.my-base(
          v-if="reviewsMeta && Object.keys(reviewsMeta).length > 0"
          v-model="review.page"
          :length="reviewsMeta.pagination.pageCount"
        )

      // Comment Form Section
      section.reviews-page-comment-form
        span.reviews-page-comment-form__title
          AppIcon.me-2(name="uil:comment-alt-plus" color="var(--color-icon-01)" :width="24" :height="24")
          | {{ $t('form.comment.title') }}

        CommentForm(ref="commentFormRef" :is-busy="comment.isBusy" @on-submit="handleCommentOnSubmit")
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useFetch,
  useRoute,
  useRouter,
  useStore,
  ref,
  reactive,
  onMounted,
  computed,
  watch
} from '@nuxtjs/composition-api'
import type { Ref, ComputedRef } from 'vue'
import type { Route } from 'vue-router'
import { withProtocol } from 'ufo'
import { CommentRefTypes } from './Reviews.page.types'
import { ReviewTypes } from '@/types'
import { convertToRevilinkFormat } from '@/utils/url'
import { AppIcon } from '@/components/Icon'
import { ReviewList } from '@/components/List'
import { CommentForm } from '@/components/Form'

export default defineComponent({
  components: {
    AppIcon,
    ReviewList,
    CommentForm
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const route: ComputedRef<Route> = useRoute()
    const router = useRouter()
    const store = useStore()

    // Redirect allowed format
    context.redirect(
      context.localePath({
        name: 'Reviews',
        query: {
          ...route.value.query,
          link: convertToRevilinkFormat({
            url: route.value.query.link as string
          })
        }
      })
    )

    const rootRef: Ref<HTMLElement | null> = ref(null)

    const site = reactive({
      isAllowed: false,
      isBusy: false,
      meta: {}
    })

    const fetchAndReadRobots = async () => {
      site.isBusy = true

      const robotsResult = await context.$api.rest.scraper.fetchAndReadRobots({
        url: route.value.query.link
      })

      site.isAllowed = robotsResult.isAllowed

      if (robotsResult.isAllowed) {
        await scrapeSite()
      }

      site.isBusy = false
    }

    const scrapeSite = async () => {
      const siteResult = await context.$api.rest.scraper.fetchMetaTags({
        url: route.value.query.link
      })

      site.meta = siteResult
    }

    const reviews = computed(() => store.getters['review/items'])
    const reviewsMeta = computed(() => store.getters['review/meta'])

    const { fetch, fetchState } = useFetch(async () => {
      const { data } = await store.dispatch('review/fetchReviews', {
        url: route.value.query.link,
        page: review.page
      })

      if (data.items?.length <= 0) {
        review.page = 1
      }
    })

    const review = reactive({
      page: route.value.query.page || 1
    })

    watch(
      () => review.page,
      value => {
        review.page = value
        router.push({ query: { ...route.value.query, page: String(value) } })
        fetch()
      }
    )

    const comment = reactive({
      isBusy: false
    })

    const commentFormRef: Ref<CommentRefTypes | null> = ref(null)

    const handleCommentOnSubmit = async (review: ReviewTypes) => {
      comment.isBusy = true

      const { data, error } = await context.$api.rest.review.postReview({
        url: route.value.query.link,
        content: review.content,
        media: null
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: 'Comment post successfully',
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        await fetch()

        commentFormRef.value?.clearForm()

        const reviewCardDOM = rootRef.value?.querySelector(`.review-list .review-card[data-id="${data.id}"] .review-card__body`)

        reviewCardDOM?.classList.add('highlight-flash-animation')
        setTimeout(() => {
          reviewCardDOM?.classList.remove('highlight-flash-animation')
        }, 3000)
      } else {
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

    onMounted(() => {
      fetchAndReadRobots()
    })

    return {
      rootRef,
      fetch,
      fetchState,
      site,
      review,
      reviews,
      reviewsMeta,
      comment,
      commentFormRef,
      handleCommentOnSubmit,
      withProtocol
    }
  }
})
</script>

<style lang="scss" src="./Reviews.page.scss"></style>
