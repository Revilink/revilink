<template lang="pug">
.page.reviews-page(ref="rootRef")
  .row.flex-column-reverse.flex-lg-row
    .col-12.col-lg-4
      .col-12.col-lg-11
        aside.sidebar
          // Link extra widget
          LinkExtraWidget(:site-meta="site.meta")
          // Site summary widget
          SiteSummaryWidget(v-if="false")
    .col-12.col-lg-8
      // Site Meta
      .reviews-page-review-meta
        vs-tooltip.reviews-page-review-meta__avatarTooltip(not-arrow shadow top :class="[{ 'pointer-events-none': site.isBusy }]")
          vs-avatar.reviews-page-review-meta__avatar(
            badge-position="top-left"
            :badge="!site.isBusy"
            :badge-color="site.isInDetector ? '#ddd' : site.isAllowed ? 'success' : '#ddd'"
          )
            AppLoading(v-if="site.isBusy" :size="20")
            template(v-else)
              img(
                v-if="(site.isInDetector || site.isAllowed) && site.meta.icon"
                :src="site.meta.icon"
                :alt="$t('general.avatar')"
                width="16"
                height="16"
                @error="site.meta.icon = false"
              )
              AppIcon(v-else name="charm:globe" color="var(--color-text-01)" :width="24" :height="24")

          template(#tooltip)
            span(v-if="site.isInDetector") {{ $t('reviews.site.meta.tooltip.inDetector') }}
            span(v-else-if="site.isAllowed") {{ $t('reviews.site.meta.tooltip.allowed') }}
            span(v-else) {{ $t('reviews.site.meta.tooltip.noAllow') }}

        .reviews-page-review-meta__body
          h1.reviews-page-review-meta__title(v-if="site.isInDetector || site.isAllowed") {{ site.meta.title }}
          h4.reviews-page-review-meta__url
            AppIcon(name="material-symbols:link" color="var(--color-link-01)" :width="24" :height="24")
            a(rel="noopener,norel" :title="$route.query.link" :href="linkViewFormat({ url: $route.query.link })" target="_blank")
              | {{ linkViewFormat({ url: $route.query.link }) }}

          // Add To Link Collection Button
          vs-button.reviews-page-review-meta-add-to-link-collection-button(
            auth-control
            size="small"
            border
            @click="handleClickAddToLinkCollection"
          )
            AppIcon.me-2(name="ri:bookmark-line" :width="14" :height="14")
            | Save
          // Reactions
          .reviews-page-reactions
            ReactionButtonGroup(
              :is-busy="reaction.isBusy || reviewsFetchState.pending"
              :busy-reaction-index="reaction.busyReactionIndex"
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
  useMeta,
  ref,
  reactive,
  onMounted,
  computed,
  watch
} from '@nuxtjs/composition-api'
import type { Ref, ComputedRef } from 'vue'
import type { Route } from 'vue-router'
import type { UrlTypes, ReactionTypes, CommentRefTypes } from './Reviews.page.types'
import { encodeBase64 } from '@/utils/encode-decode'
import type { ReviewTypes } from '@/types'
import { convertToRevilinkFormat, linkViewFormat } from '@/utils/url'
import { useSiteScraper } from '@/hooks'
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

    const { site, extractSiteMeta } = useSiteScraper()

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
        url: convertToRevilinkFormat({
          url: route.value.query.link as string
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
            url: route.value.query.link as string
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

    onMounted(() => {
      extractSiteMeta({
        url: convertToRevilinkFormat({
          url: route.value.query.link as string
        })
      })
    })

    const handleClickAddToLinkCollection = () => {
      store.commit('link-collection/OPEN_LINK_COLLECTIONS_DIALOG')
      store.commit('link-collection/SET_SELECTED_LINK', {
        url: route.value.query.link as string,
        description: null
      })
    }

    const truncateLink = (str: string, num = 50) => {
      return str.length > num ? str.slice(0, num) + '...' : str
    }

    useMeta(
      () =>
        ({
          title: context.i18n.t('seo.reviews.title', { link: truncateLink(route.value.query.link as string) }),
          meta: [
            {
              hid: 'og:title',
              name: 'og:title',
              content: context.i18n.t('seo.reviews.title', { link: truncateLink(route.value.query.link as string) })
            },
            {
              hid: 'twitter:title',
              name: 'twitter:title',
              content: context.i18n.t('seo.reviews.title', { link: truncateLink(route.value.query.link as string) })
            },
            {
              hid: 'description',
              name: 'description',
              content: context.i18n.t('seo.reviews.description', { link: truncateLink(route.value.query.link as string) })
            },
            {
              hid: 'og:description',
              name: 'og:description',
              content: context.i18n.t('seo.reviews.description', { link: truncateLink(route.value.query.link as string) })
            },
            {
              hid: 'twitter:description',
              name: 'twitter:description',
              content: context.i18n.t('seo.reviews.description', { link: truncateLink(route.value.query.link as string) })
            }
          ]
        } as any)
    )

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
      convertToRevilinkFormat,
      linkViewFormat,
      handleClickAddToLinkCollection
    }
  },
  head: {}
})
</script>

<style lang="scss" src="./Reviews.page.scss"></style>
