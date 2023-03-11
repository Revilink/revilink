<template lang="pug">
.review-list
  .review-list-head
    AppIcon.review-list-head__icon(name="uil:comment-alt-dots" color="var(--color-icon-01)" :width="28" :height="28")
    span.review-list-head__title Comments ({{ items.length }})
  ReviewCard(v-for="item in items" :key="item.id" :review="item")

  // Pagination
  client-only
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
  props: {
    items: {
      type: Array,
      required: false,
      default: null
    }
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
