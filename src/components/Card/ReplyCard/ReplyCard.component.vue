<template lang="pug">
.reply-card(:data-id="reply.id")
  .reply-card__inner
    .reply-card__avatar(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.AVATAR)")
      NuxtLink(:to="localePath({ name: 'Profile', query: { username: reply.user.username } })" :title="reply.user.username")
        AppAvatar(:user="reply.user" :size="48")

    .reply-card__body
      slot(name="bodyPrepend")
      .reply-card-meta
        .reply-card-meta__user
          NuxtLink(:to="localePath({ name: 'Profile', query: { username: reply.user.username } })" :title="reply.user.username")
            strong {{ reply.user.username }}
        .reply-card-meta__date
          span.d-none.d-md-block •&nbsp;
          NuxtLink(:to="localePath({ name: 'Comment', query: { id: reply.id } })")
            ClientOnly
              Timeago(:datetime="reply.createdAt" :auto-update="60" :locale="$i18n.locale")

      .reply-card-review
        p.reply-card-review__text {{ reply.content }}

      client-only
        .reply-card-actions
          template(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.LIKE)")
            .reply-card-actions-item.like-button(role="button" auth-control :class="[likedClass]" @click="toggleLike")
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
            .reply-card-actions-item.edit-button(role="button" @click="handleClickEdit")
              PaperButton.reply-card-actions-item__button(:width="36" :height="36")
                AppIcon(name="ri:edit-line" :width="18" :height="18")
              span.reply-card-actions-item__label {{ $t('general.edit') }}

            .reply-card-actions-item.delete-button(role="button" @click="handleClickDelete")
              PaperButton.reply-card-actions-item__button(:width="36" :height="36")
                AppIcon(name="ri:delete-bin-6-line" :width="18" :height="18")
              span.reply-card-actions-item__label {{ $t('general.delete') }}

          vs-tooltip.reply-card-actions.share-button.ms-auto(v-if="false" not-arrow shadow role="button")
            PaperButton.reply-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:share-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.share') }}

          vs-tooltip.reply-card-actions-item.report-button(v-if="false" not-arrow shadow role="button")
            PaperButton.reply-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:flag-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.report') }}

  EditCommentDialog(
    :is-open="form.edit.isOpen"
    :is-busy="form.edit.isBusy"
    :comment="reply"
    @on-close="form.edit.isOpen = false"
    @on-confirm="handleEdit"
  )
  DeleteCommentDialog(
    :is-open="form.delete.isOpen"
    :is-busy="form.delete.isBusy"
    :comment="reply"
    @on-close="form.delete.isOpen = false"
    @on-confirm="handleDelete"
  )
</template>

<script lang="ts">
import { defineComponent, useContext, reactive } from '@nuxtjs/composition-api'
import { ReviewTypes } from '@/types'
import { useCommentLike, useReviewsEmbed } from '@/hooks'
import { AppAvatar } from '@/components/Avatar'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { EditCommentDialog, DeleteCommentDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    AppAvatar,
    PaperButton,
    AppIcon,
    EditCommentDialog,
    DeleteCommentDialog
  },
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const { setReviewsEmbedOptions, reviewsEmbedOptionKeyEnum, getReviewsEmbedOption } = useReviewsEmbed()

    setReviewsEmbedOptions(context.route.value.fullPath)

    const form = reactive({
      edit: {
        isOpen: false,
        isBusy: false
      },
      delete: {
        isOpen: false,
        isBusy: false
      }
    })

    const { like, getMyLike, toggleLike, likedClass } = useCommentLike(props.reply)
    getMyLike()

    const handleClickReply = () => {
      emit('on-click-reply')
    }

    const handleClickEdit = () => {
      form.edit.isOpen = true
      emit('on-click-edit')
    }

    const handleEdit = async (review: ReviewTypes) => {
      form.edit.isBusy = true

      const { data, error } = await context.$api.rest.review.editReview({
        id: review.id,
        content: review.content,
        media: null
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.editSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        form.edit.isOpen = false

        emit('on-edit-success', review)
      } else {
        emit('on-edit-error', { ...review, ...error })
      }

      emit('on-edit-confirm', review)

      form.edit.isBusy = false
    }

    const handleClickDelete = () => {
      form.delete.isOpen = true
      emit('on-click-delete')
    }

    const handleDelete = async (review: ReviewTypes) => {
      form.delete.isBusy = true

      const { data, error } = await context.$api.rest.review.deleteReview({
        id: review.id
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.deleteSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        emit('on-delete-success', review)
      } else {
        emit('on-delete-error', { ...review, ...error })
      }

      emit('on-delete-confirm', review)

      form.delete.isBusy = false
    }

    return {
      form,
      like,
      toggleLike,
      likedClass,
      handleClickReply,
      handleClickEdit,
      handleEdit,
      handleClickDelete,
      handleDelete,
      reviewsEmbedOptionKeyEnum,
      getReviewsEmbedOption
    }
  }
})
</script>

<style lang="scss" src="./ReplyCard.component.scss"></style>
