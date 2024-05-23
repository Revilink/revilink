<template lang="pug">
.review-list
  slot(name="prepend")
  template(v-if="items && items.length > 0")
    .review-list__item(v-for="item in items" :key="item.id")
      slot(name="itemPrepend")
      ReviewCard(:key="item.id" :review="item" @on-edit-success="handleEditSuccess" @on-delete-success="handleDeleteSuccess")
      slot(name="itemAppend")
  template(v-else)
    .review-list__noResults
      slot(v-if="$slots.noResults" name="noResults")
      BasicState(:title="$t('state.empty.noReviewComments.title')" :description="$t('state.empty.noReviewComments.description')")
        template(#head)
          img(src="/media/elements/state/no_chat.svg" width="256")
  slot(name="append")
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { ReviewTypes } from '@/types'
import ReviewCard from '@/components/Card/ReviewCard/ReviewCard.component.vue'
import { BasicState } from '@/components/State'

export default defineComponent({
  components: {
    ReviewCard,
    BasicState
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

    const handleEditSuccess = async (review: ReviewTypes) => {
      await store.commit('review/EDIT_REVIEW', {
        id: review.id,
        review: {
          content: review.content
        }
      })
    }

    const handleDeleteSuccess = async (review: ReviewTypes) => {
      await store.commit('review/DELETE_REVIEW', review.id)
    }

    return {
      handleEditSuccess,
      handleDeleteSuccess
    }
  }
})
</script>

<style lang="scss" src="./ReviewList.component.scss"></style>
