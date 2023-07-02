<template lang="pug">
.profile-comment-list.review-list
  slot(name="prepend")
  template(v-if="items && items.length > 0")
    .profile-comment-list.review-list__item(v-for="item in items" :key="item.id")
      slot(name="itemPrepend")
      client-only
        ReviewCard(:review="item" @on-edit-success="handleEditSuccess" @on-delete-success="handleDeleteSuccess")
          template(#bodyPrepend)
            NuxtLink.profile-comment-list-url(
              :to="localePath({ name: 'Reviews', query: { link: $decodeBase64(item.url.url) } })"
              :title="$decodeBase64(item.url.url)"
            )
              AppIcon.profile-comment-list-url__icon(name="material-symbols:link" color="var(--color-link-01)" :width="24" :height="24")
              span.profile-comment-list-url__title {{ $decodeBase64(item.url.url) }}
      slot(name="itemAppend")
  template(v-else)
    .profile-comment-list__noResults
      slot(v-if="$slots.noResults" name="noResults")
      BasicState(
        :title="$t('state.empty.profileNoReviewComments.title')"
        :description="$t('state.empty.profileNoReviewComments.description')"
      )
        template(#head)
          img(src="@/assets/media/elements/state/no_chat.svg" width="256")
  slot(name="append")
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { ReviewTypes } from '@/types'
import ReviewCard from '@/components/Card/ReviewCard/ReviewCard.component.vue'
import { AppIcon } from '@/components/Icon'
import { BasicState } from '@/components/State'

export default defineComponent({
  components: {
    ReviewCard,
    AppIcon,
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

<style lang="scss" src="./ProfileCommentList.component.scss"></style>
