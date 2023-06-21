<template lang="pug">
client-only
  vs-dialog.reply-dialog(v-model="dialog.isOpen" @close="handleClose")
    template(#header)
      h2 {{ $t('general.reply') }}

    .reply-dialog-summary
      .reply-dialog-summary-user
        vs-avatar.reply-dialog-summary-user__avatar(circle size="32")
          NuxtLink(:to="localePath({ name: 'Profile', query: { username: review.user.username } })" :title="review.user.username")
            img(v-if="review.user.avatar" :src="review.user.avatar.formats.thumbnail.url" :alt="review.user.username")
            img(v-else src="@/assets/media/core/user.png" :alt="review.user.username")
        strong.reply-dialog-summary-user__username @{{ review.user.username }}
      p.reply-dialog-summary__content {{ review.content }}

    CommentForm(ref="commentFormRef" :is-busy="comment.isBusy" @on-submit="handleCommentOnSubmit")
</template>

<script lang="ts">
import { defineComponent, useContext, ref, reactive, watch } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import type { CommentRefTypes } from './ReplyDialog.component.types'
import type { ReviewTypes } from '@/types'
import { CommentForm } from '@/components/Form'

export default defineComponent({
  components: {
    CommentForm
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    review: {
      type: Object,
      required: true
    },
    reply: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const dialog = reactive({
      isOpen: props.isOpen
    })

    const commentFormRef: Ref<CommentRefTypes | null> = ref(null)

    watch(
      () => props.isOpen,
      value => {
        if (value) {
          dialog.isOpen = true

          const FOCUS_DELAY = 200
          setTimeout(() => {
            commentFormRef.value?.focus()
          }, FOCUS_DELAY)
        } else {
          dialog.isOpen = false
        }
      }
    )

    const handleClose = () => {
      dialog.isOpen = false

      emit('on-close')
    }

    const comment = reactive({
      isBusy: false
    })

    const handleCommentOnSubmit = async (formPayload: ReviewTypes) => {
      comment.isBusy = true

      const { data, error } = await context.$api.rest.review.postReview({
        parent: props.review,
        url: props.review.url.url,
        content: formPayload.content,
        media: null
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: 'Comment post successfully',
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        handleClose()

        emit('on-submit-reply-success', { ...data, user: { ...context.$auth.user } })
      } else {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })

        emit('on-submit-reply-error', { ...error })
      }

      comment.isBusy = false
    }

    return {
      dialog,
      handleClose,
      commentFormRef,
      comment,
      handleCommentOnSubmit
    }
  }
})
</script>

<style lang="scss" src="./ReplyDialog.component.scss"></style>
