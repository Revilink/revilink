<template lang="pug">
.page.comment-page
  .col-lg-8.mx-auto
    template(v-if="fetchState.pending")
      AppLoading.py-base
    template(v-else-if="fetchState.error")
      span {{ fetchState.error }}
    template(v-else)
      .comment-page-head
        h1.comment-page-head__title
          template(v-if="review.parent") {{ $t('general.reply') }}
          template(v-else) {{ $t('general.comment') }}
      UrlLinkCard(:url="$decodeBase64(review.url.url)")
      // Reply
      template(v-if="review.parent")
        .comment-page-reply
          .comment-page-reply-parent
            ReviewCard(
              :review="review.parent"
              :is-detailed="true"
              :with-replies="false"
              @on-click-like-count="handleClickLikeCount"
              @on-click-reply-count="handleClickReplyCount"
              @on-edit-success="handleEditSuccess"
              @on-delete-success="handleDeleteSuccess"
            )
          ReplyCard(
            :reply="review"
            :is-detailed="true"
            @on-click-like-count="handleClickLikeCount"
            @on-click-reply-count="handleClickReplyCount"
            @on-edit-success="handleEditSuccess"
            @on-delete-success="handleDeleteSuccess"
          )

      // Main Comment
      template(v-else)
        ReviewCard(
          :review="review"
          :is-detailed="true"
          @on-click-like-count="handleClickLikeCount"
          @on-click-reply-count="handleClickReplyCount"
          @on-edit-success="handleEditSuccess"
          @on-delete-success="handleDeleteSuccess"
        )

  ReactionerUserListDialog(
    :is-open="dialog.reactionerUserList.isOpen"
    :reaction-type="dialog.reactionerUserList.type"
    @on-close="dialog.reactionerUserList.isOpen = false"
  )
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useRouter, useFetch, ref, reactive, watch } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import type { ReactionerUserListDialogTypes } from './Comment.page.types'
import type { ReviewTypes } from '@/types'
import { UrlLinkCard, ReviewCard, ReplyCard } from '@/components/Card'
import { ReactionerUserListDialog } from '@/components/Dialog'
import { AppLoading } from '@/components/Loading'

export default defineComponent({
  components: {
    UrlLinkCard,
    ReviewCard,
    ReplyCard,
    ReactionerUserListDialog,
    AppLoading
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

    const handleEditSuccess = async () => {
      await fetch()
    }

    const handleDeleteSuccess = async () => {
      await router.push(context.localePath({ name: 'Reviews', query: { link: context.$decodeBase64(review.value.url.url) } }))
    }

    const dialog = reactive({
      reactionerUserList: {
        isOpen: false,
        type: 'likes'
      } as ReactionerUserListDialogTypes
    })

    watch(
      () => route.value.query.id,
      async () => {
        await fetch()
      }
    )

    return {
      fetch,
      fetchState,
      review,
      handleClickLikeCount,
      handleClickReplyCount,
      handleEditSuccess,
      handleDeleteSuccess,
      dialog
    }
  }
})
</script>

<style lang="scss" src="./Comment.page.scss"></style>
