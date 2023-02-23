<template lang="pug">
.review-list
  .review-list-head
    AppIcon.review-list-head__icon(name="ph:chat-centered-dots" color="var(--color-icon-01)" :width="28" :height="28")
    span.review-list-head__title Comments (5)
  ReviewCard(v-for="n in 5" :key="n")

  // Pagination
  vs-pagination.review-list__pagination(v-model="list.page" :length="10 / 5")
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { ListType } from './ReviewList.component.types'
import { AppIcon } from '@/components/Icon'
import { ReviewCard } from '@/components/Card'

export default defineComponent({
  components: {
    AppIcon,
    ReviewCard
  },
  setup() {
    const list = reactive<ListType>({
      page: 1
    })

    return {
      list
    }
  }
})
</script>

<style lang="scss" src="./ReviewList.component.scss"></style>
