<template lang="pug">
.reply-card(:data-id="reply.id")
  .reply-card__inner
    vs-avatar.reply-card__avatar(circle size="48")
      NuxtLink(:to="localePath({ name: 'Profile', query: { username: reply.user.username } })" :title="reply.user.username")
        img(v-if="reply.user.avatar" :src="reply.user.avatar" :alt="reply.user.username")
        img(v-else src="@/assets/media/core/user.png" :alt="reply.user.username")

    .reply-card__body
      slot(name="bodyPrepend")
      .reply-card-meta
        .reply-card-meta__user
          NuxtLink(:to="localePath({ name: 'Profile', query: { username: reply.user.username } })" :title="reply.user.username")
            strong {{ reply.user.username }}
        .reply-card-meta__date
          | • &nbsp;
          Timeago(:datetime="reply.createdAt" :auto-update="60" :locale="$i18n.locale")

      .reply-card-review
        p.reply-card-review__text {{ reply.content }}

      client-only
        .reply-card-actions
          .reply-card-actions-item.like-button(role="button" :class="[likedClass]" @click="toggleLike")
            PaperButton.reply-card-actions-item__button(:width="36" :height="36")
              AppIcon(v-if="like.isActive" name="ri:heart-3-fill" :width="18" :height="18")
              AppIcon(v-else name="ri:heart-3-line" :width="18" :height="18")
            span.reply-card-actions-item__label
              template(v-if="like.count <= 0") {{ $t('general.like') }}
              template(v-else) {{ like.count }}

          .reply-card-actions-item.reply-button(v-if="false" role="button" @click="handleClickReply")
            PaperButton.reply-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:chat-1-line" :width="18" :height="18")
            span.reply-card-actions-item__label {{ $t('general.reply') }}

          template(v-if="$auth.loggedIn && $auth.user.username === reply.user.username")
            .reply-card-actions-item.delete-button(role="button" @click="handleClickDelete")
              PaperButton.reply-card-actions-item__button(:width="36" :height="36")
                AppIcon(name="ri:delete-bin-6-line" :width="18" :height="18")
              span.reply-card-actions-item__label {{ $t('general.delete') }}

          vs-tooltip.reply-card-actions.share-button.ms-auto(not-arrow shadow role="button")
            PaperButton.reply-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:share-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.share') }}

          vs-tooltip.reply-card-actions-item.report-button(not-arrow shadow role="button")
            PaperButton.reply-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:flag-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.report') }}

  ReplyDialog(:is-open="form.reply.isOpen" :review="review" :reply="reply" @on-close="form.reply.isOpen = false")
  DeleteCommentDialog(:is-open="form.delete.isOpen" :comment="reply" @on-close="form.delete.isOpen = false" @on-confirm="handleDelete")
</template>

<script lang="ts">
import { defineComponent, useContext, reactive, computed } from '@nuxtjs/composition-api'
import { ReviewTypes } from '@/types'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { ReplyDialog, DeleteCommentDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    PaperButton,
    AppIcon,
    ReplyDialog,
    DeleteCommentDialog
  },
  props: {
    reply: {
      type: Object,
      required: true
    },
    review: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const form = reactive({
      reply: {
        isOpen: false
      },
      delete: {
        isOpen: false
      }
    })

    const like = reactive({
      isActive: false,
      count: props.reply.likeCount || 0
    })

    const toggleLike = () => {
      like.isActive = !like.isActive

      if (like.isActive) {
        like.count += 1
      } else {
        like.count -= 1
      }
    }

    const likedClass = computed(() => {
      const likeButtonClassName = 'like-button'

      if (like.isActive) {
        return `${likeButtonClassName}--liked`
      }
    })

    const handleClickReply = () => {
      form.reply.isOpen = true
      emit('on-click-reply')
    }

    const handleClickDelete = () => {
      form.delete.isOpen = true
      emit('on-click-delete')
    }

    const handleDelete = async (review: ReviewTypes) => {
      const { data, error } = await context.$api.rest.review.deleteReview({
        id: review.id
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: 'Delete successfully',
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        emit('on-delete-success', review)
      } else {
        emit('on-delete-error', { ...review, ...error })
      }

      emit('on-delete-confirm', review)
    }

    return {
      form,
      like,
      toggleLike,
      likedClass,
      handleClickReply,
      handleClickDelete,
      handleDelete
    }
  }
})
</script>

<style lang="scss" src="./ReplyCard.component.scss"></style>
