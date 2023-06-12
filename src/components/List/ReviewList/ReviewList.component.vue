<template lang="pug">
.review-list
  .review-list-head
    AppIcon.review-list-head__icon(name="uil:comment-alt-dots" color="var(--color-icon-01)" :width="28" :height="28")
    span.review-list-head__title(v-if="items.length") Comments ({{ items.length }})
  ReviewCard(v-for="item in items" :key="item.id" :review="item")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
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
    return {}
  }
})
</script>

<style lang="scss" src="./ReviewList.component.scss"></style>
