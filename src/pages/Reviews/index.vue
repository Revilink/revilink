<template lang="pug">
.page.reviews-page(ref="rootRef")
  .row
    .col-4
      .col-11
        // Link extra widget
        LinkExtraWidget
        // Site summary widget
        SiteSummaryWidget(v-if="false")
    .col-8
      // Site Meta
      .reviews-page-review-meta
        vs-tooltip.reviews-page-review-meta__avatarTooltip(not-arrow shadow top :class="[{ 'pointer-events-none': site.isBusy }]")
          vs-avatar.reviews-page-review-meta__avatar(
            badge-position="top-left"
            :badge="!site.isBusy"
            :badge-color="site.isAllowed ? 'success' : '#ddd'"
          )
            AppLoading(v-if="site.isBusy" :size="20")
            template(v-else)
              img(
                v-if="site.isAllowed && site.meta.icon"
                :src="site.meta.icon"
                :alt="$t('general.avatar')"
                width="16"
                height="16"
                @error="site.meta.icon = false"
              )
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

          // Reactions
          .reviews-page-reactions
            ReactionButtonGroup(
              :reaction-count="reaction.reactionCount"
              :my-reaction="reaction.myReaction"
              @on-click-reaction-button="handleReaction"
            )

      // Review List
      .reviews-page-review-list
        .reviews-page-review-list-head
          AppIcon.reviews-page-review-list-head__icon(name="uil:comment-alt-dots" color="var(--color-icon-01)" :width="28" :height="28")
          span.reviews-page-review-list-head__title
            | {{ $t('general.comments') }}
            template(v-if="reviews && reviews.length > 0")
              | &nbsp;({{ reviewsMeta.pagination.total }})

        template(v-if="reviewsFetchState.pending")
          AppLoading.py-base

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
      section.reviews-page-comment-form.my-base.py-base
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
import type { UrlTypes, ReactionTypes, CommentRefTypes } from './Reviews.page.types'
import { encodeBase64 } from '@/utils/encode-decode'
import type { ReviewTypes } from '@/types'
import { convertToRevilinkFormat } from '@/utils/url'
import { AppIcon } from '@/components/Icon'
import { ReactionButtonGroup } from '@/components/ButtonGroup'
import { ReviewList } from '@/components/List'
import { CommentForm } from '@/components/Form'
import { AppLoading } from '@/components/Loading'
import { LinkExtraWidget, SiteSummaryWidget } from '@/components/Widget'

export default defineComponent({
  components: {
    AppIcon,
    ReactionButtonGroup,
    ReviewList,
    CommentForm,
    AppLoading,
    LinkExtraWidget,
    SiteSummaryWidget
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

    // Url
    const url = ref<UrlTypes>({})

    const { fetch: urlFetch, fetchState: urlFetchState } = useFetch(async () => {
      const { data } = await context.$api.rest.url.fetchUrl({
        filters: `filters[url][$eq]=${encodeBase64(
          convertToRevilinkFormat({
            url: route.value.query.link as string
          })
        )}`
      })

      if (data?.item) {
        url.value = data.item
      }
    })

    // Website
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

    // Comments
    const review = reactive({
      page: route.value.query.page || 1
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
            url: route.value.query.link as string
          })
        )}&filters[parent][id][$notNull]=false`,
        pagination: `pagination[page]=${review.page}&pagination[pageSize]=10`
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
      () => route.value.query.page,
      value => {
        review.page = Number(value || 1)
      }
    )

    const handleCommentOnSubmit = async (formPayload: ReviewTypes) => {
      comment.isBusy = true

      const { data, error } = await context.$api.rest.review.postReview({
        url: route.value.query.link,
        content: formPayload.content,
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

        await reviewsFetch()

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

    // Reactions
    const reaction = reactive<ReactionTypes>({
      reactionCount: {},
      myReaction: {}
    })

    const fetchUrlReactions = async () => {
      const { data } = await context.$api.rest.url.fetchUrlReactions({
        filters: `filters[url][url][$eq]=${encodeBase64(
          convertToRevilinkFormat({
            url: route.value.query.link as string
          })
        )}`
      })

      if (data) {
        reaction.reactionCount = data.meta.reactionCount
        reaction.myReaction = data.meta.myReaction
      }
    }

    fetchUrlReactions()

    const handleReaction = async (type: string) => {
      if (type === reaction.myReaction?.type) {
        const { data, error } = await context.$api.rest.url.deleteReaction(reaction.myReaction.id)

        if (data) {
          reaction.myReaction = {}

          await fetchUrlReactions()
        } else {
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
        } else {
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
          url: route.value.query.link,
          type
        })

        if (data) {
          url.value = data.url

          await fetchUrlReactions()
        } else {
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

    onMounted(() => {
      fetchAndReadRobots()
    })

    return {
      rootRef,
      url,
      urlFetch,
      urlFetchState,
      site,
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
      withProtocol
    }
  }
})
</script>

<style lang="scss" src="./Reviews.page.scss"></style>
