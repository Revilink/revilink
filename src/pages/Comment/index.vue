<template lang="pug">
.page.comment-page
  .col-lg-8.mx-auto
    .comment-page-head
      h1.comment-page-head__title {{ $t('general.comment') }}

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
        @on-edit-confirm="handleEditConfirm"
        @on-delete-confirm="handleDeleteConfirm"
      )

  ReactionerUserListDialog(
    :is-open="dialog.reactionerUserList.isOpen"
    :reaction-type="dialog.reactionerUserList.type"
    @on-close="dialog.reactionerUserList.isOpen = false"
  )
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useRouter, useFetch, ref, reactive } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
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
    const router = useRouter()

    const review: Ref = ref({} as ReviewTypes)

    const { fetch, fetchState } = useFetch(async () => {
      const { data } = await context.$api.rest.review.fetchReview(route.value.query.id)

      if (data) {
        review.value = data.item
      }
    })

    const handleClickLikeCount = () => {
      dialog.reactionerUserList.type = 'likes'
      dialog.reactionerUserList.isOpen = true
    }

    const handleClickReplyCount = () => {
      dialog.reactionerUserList.type = 'replies'
      dialog.reactionerUserList.isOpen = true
    }

    const handleEditConfirm = async () => {
      await fetch()
    }

    const handleDeleteConfirm = async () => {
      await router.push(context.localePath({ name: 'Reviews', query: { link: review.value.url.url } }))
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
      handleEditConfirm,
      handleDeleteConfirm,
      dialog
    }
  }
})
</script>

<style lang="scss" src="./Comment.page.scss"></style>
