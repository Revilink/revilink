<template lang="pug">
.review-list
  .review-list-head
    AppIcon.review-list-head__icon(name="uil:comment-alt-dots" color="var(--color-icon-01)" :width="28" :height="28")
    span.review-list-head__title
      | {{ $t('general.comments') }}
      template(v-if="items.length")
        | &nbsp;({{ reviewsMeta.pagination.total }})

  template(v-if="items && items.length > 0")
    ReviewCard(v-for="item in items" :key="item.id" :review="item")
  template(v-else)
    p.mb-base No results
</template>

<script lang="ts">
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'
import ReviewCard from '@/components/Card/ReviewCard/ReviewCard.component.vue'

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
    const store = useStore()

    const reviewsMeta = computed(() => store.getters['review/meta'])

    return {
      reviewsMeta
    }
  }
})
</script>

<style lang="scss" src="./ReviewList.component.scss"></style>
