<template lang="pug">
.page.reviews-page
  .row
    .col-4
      .col-11
        span Sidebar
    .col-8
      // Site Meta
      template(v-if="true")
        .reviews-page-review-meta
          vs-avatar.reviews-page-review-meta__avatar
            img(v-if="site.meta.icon" :src="site.meta.icon" alt="avatar")
            AppIcon(v-else name="charm:globe" color="var(--color-text-01)" :width="22" :height="22")

          .reviews-page-review-meta__body
            h1.reviews-page-review-meta__title {{ site.meta.title }}
            h4.reviews-page-review-meta__url
              AppIcon(name="material-symbols:link" color="var(--color-link-01)" :width="22" :height="22")
              a(title="title" rel="noopener,norel" :href="$route.query.link" target="_blank") {{ $route.query.link }}

      template(v-if="fetchState.pending")
        span Loading
      template(v-else-if="fetchState.error")
        span {{ fetchState.error }}
      template(v-else)
        // Review List
        ReviewList(:items="review.items")

        // Comment Form Section
        section.reviews-page-comment-form
          span.reviews-page-comment-form__title
            AppIcon.me-2(name="uil:comment-alt-plus" color="var(--color-icon-01)" :width="24" :height="24")
            | {{ $t('form.comment.title') }}

          CommentForm
</template>

<script lang="ts">
import { defineComponent, useFetch, useContext, useRoute, reactive, onMounted } from '@nuxtjs/composition-api'
import { ReviewType } from './Reviews.page.types'
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

    const site = reactive({
      isAllowed: false,
      meta: {}
    })

    const fetchAndReadRobots = async () => {
      const robotsResult = await context.$api.rest.scraper.fetchAndReadRobots({
        url: route.value.query.link
      })

      site.isAllowed = robotsResult.isAllowed

      console.log(robotsResult)
    }

    const fetchSite = async () => {
      const siteResult = await context.$api.rest.scraper.fetchMetaTags({
        url: route.value.query.link
      })

      site.meta = siteResult

      console.log(siteResult)
    }

    onMounted(() => {
      fetchAndReadRobots()
      fetchSite()
    })

    const review = reactive<ReviewType>({
      page: 1,
      items: []
    })

    const { fetch, fetchState } = useFetch(async () => {
      const reviewsResult = await context.$api.rest.review.fetchReviews()

      review.items = reviewsResult
    })

    return {
      site,
      fetch,
      fetchState,
      review
    }
  }
})
</script>

<style lang="scss" src="./Reviews.page.scss"></style>
