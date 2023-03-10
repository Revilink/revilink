<template lang="pug">
.page.comment-page
  .col-lg-8.mx-auto
    .comment-page-head
      h1.comment-page-head__title Comment

    template(v-if="fetchState.pending")
      span Loading
    template(v-else-if="fetchState.error")
      span {{ fetchState.error }}
    template(v-else)
      ReviewCard(:review="review" :is-detailed="true")
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useFetch, ref } from '@nuxtjs/composition-api'
import { ReviewTypes } from '@/types'
import { ReviewCard } from '@/components/Card'

export default defineComponent({
  components: {
    ReviewCard
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const route = useRoute()

    const review = ref<Object>({} as ReviewTypes)

    const { fetch, fetchState } = useFetch(async () => {
      const result = await context.$api.rest.review.fetchReview(route.value.params.id)

      review.value = result
    })

    return {
      fetch,
      fetchState,
      review
    }
  }
})
</script>

<style lang="scss" src="./Comment.page.scss"></style>
