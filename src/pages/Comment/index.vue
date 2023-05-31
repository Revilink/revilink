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
      ReviewCard(
        :review="review"
        :is-detailed="true"
        @on-click-like-count="handleClickLikeCount"
        @on-click-reply-count="handleClickReplyCount"
      )

  ReactionerUserListDialog(
    :is-open="dialog.reactionerUserList.isOpen"
    :reaction-type="dialog.reactionerUserList.type"
    @on-close="dialog.reactionerUserList.isOpen = false"
  )
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useFetch, ref, reactive } from '@nuxtjs/composition-api'
import { ReactionerUserListDialogTypes } from './Comment.page.types'
import { ReviewTypes } from '@/types'
import { ReviewCard } from '@/components/Card'
import { ReactionerUserListDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    ReviewCard,
    ReactionerUserListDialog
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const route = useRoute()

    const review = ref<Object>({} as ReviewTypes)

    const { fetch, fetchState } = useFetch(async () => {
      const result = await context.$api.rest.review.fetchReview(route.value.query.id)

      review.value = result
    })

    const handleClickLikeCount = () => {
      dialog.reactionerUserList.type = 'likes'
      dialog.reactionerUserList.isOpen = true
    }

    const handleClickReplyCount = () => {
      dialog.reactionerUserList.type = 'replies'
      dialog.reactionerUserList.isOpen = true
    }

    const dialog = reactive({
      reactionerUserList: {
        isOpen: false,
        type: 'likes'
      } as ReactionerUserListDialogTypes
    })

    return {
      fetch,
      fetchState,
      review,
      handleClickLikeCount,
      handleClickReplyCount,
      dialog
    }
  }
})
</script>

<style lang="scss" src="./Comment.page.scss"></style>
