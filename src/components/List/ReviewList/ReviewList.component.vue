<template lang="pug">
.review-list
  .review-list-head
    AppIcon.review-list-head__icon(name="ph:chat-centered-dots-fill" color="var(--color-icon-01)" :width="28" :height="28")
    span.review-list-head__title Comments (5)
  ReviewCard(v-for="n in 5" :key="n")
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
  setup() {}
})
</script>

<style lang="scss" src="./ReviewList.component.scss"></style>
