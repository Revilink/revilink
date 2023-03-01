<template lang="pug">
.page.reviews-page
  .row
    .col-4
      .col-11
        span Sidebar
    .col-8
      // Site Meta
      .reviews-page-review-meta
        vs-avatar.reviews-page-review-meta__avatar
          img(v-if="true" src="https://www.sahibinden.com/favicon.ico" alt="avatar")
          AppIcon(v-else name="charm:globe" color="var(--color-text-01)" :width="22" :height="22")

        .reviews-page-review-meta__body
          h1.reviews-page-review-meta__title %18 KDV 2017 VOLKSWAGEN POLO 1.4 TDI 90 HP COMFORTLINE 145.905KM
          h4.reviews-page-review-meta__url
            AppIcon(name="material-symbols:link" color="var(--color-link-01)" :width="22" :height="22")
            a(title="title" rel="noopener,norel" :href="$route.query.link" target="_blank") {{ $route.query.link }}

      // Review List
      ReviewList
</template>

<script lang="ts">
import { defineComponent, useFetch, useContext, reactive } from '@nuxtjs/composition-api'
import { ReviewType } from './Reviews.page.types'
import { AppIcon } from '@/components/Icon'
import { ReviewList } from '@/components/List'

export default defineComponent({
  components: {
    AppIcon,
    ReviewList
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()

    const review = reactive<ReviewType>({
      page: 1,
      items: []
    })

    const { fetch, fetchState } = useFetch(async () => {
      const result = await context.$api.rest.review.fetchReviews()

      review.items = result
    })

    return {
      fetch,
      fetchState,
      review
    }
  }
})
</script>

<style lang="scss" src="./Reviews.page.scss"></style>
