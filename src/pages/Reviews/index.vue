<template lang="pug">
.page.reviews-page(ref="rootRef")
  .row
    .col-4
      .col-11
        span Sidebar
    .col-8
      // Site Meta
      .reviews-page-review-meta
        vs-avatar.reviews-page-review-meta__avatar
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

        .reviews-page-review-meta__body
          h1.reviews-page-review-meta__title(v-if="site.isAllowed") {{ site.meta.title }}
          h4.reviews-page-review-meta__url
            AppIcon(name="material-symbols:link" color="var(--color-link-01)" :width="24" :height="24")
            a(title="title" rel="noopener,norel" :href="$route.query.link" target="_blank") {{ $route.query.link }}

      // Review List
      ReviewList(v-if="reviews && reviews.length > 0" :items="reviews")

      // Comment Form Section
      section.reviews-page-comment-form
        span.reviews-page-comment-form__title
          AppIcon.me-2(name="uil:comment-alt-plus" color="var(--color-icon-01)" :width="24" :height="24")
          | {{ $t('form.comment.title') }}

        CommentForm(ref="commentFormRef" :is-busy="comment.isBusy" @on-submit="handleCommentOnSubmit")
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch, useRoute, useStore, ref, reactive, onMounted, computed } from '@nuxtjs/composition-api'
import { Ref } from 'vue'
import { CommentRefTypes } from './Reviews.page.types'
import { ReviewTypes } from '@/types'
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
    const route = useRoute()
    const store = useStore()

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

    const { fetch, fetchState } = useFetch(async () => {
      await store.dispatch('review/fetchReviews', {
        url: route.value.query.link
      })
    })

    const comment = reactive({
      isBusy: false
    })

    const commentFormRef: Ref<CommentRefTypes | null> = ref(null)

    const handleCommentOnSubmit = async (review: ReviewTypes) => {
      comment.isBusy = true

      const { data } = await context.$api.rest.review.postReview({
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
      reviews,
      comment,
      commentFormRef,
      handleCommentOnSubmit
    }
  }
})
</script>

<style lang="scss" src="./Reviews.page.scss"></style>
