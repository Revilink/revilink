<template lang="pug">
.review-card(ref="rootRef" :class="[detailedClass]" :data-id="review.id")
  .review-card__inner
    vs-avatar.review-card__avatar(circle size="48")
      NuxtLink(to="#" :title="review.user.username")
        img(v-if="review.user.avatar" :src="review.user.avatar" alt="avatar")
        img(v-else src="@/assets/media/core/user.png" :alt="review.user.username")

    .review-card__body
      .review-card-meta
        .review-card-meta__user
          NuxtLink(to="#" :title="review.user.username")
            strong {{ review.user.username }}
        .review-card-meta__date(v-if="!isDetailed")
          | • &nbsp;
          NuxtLink(
            :to="localePath({ name: 'Comment', query: { id: review.id } })"
            :title="formatToFullDate({ date: new Date(review.createdAt), locale: $i18n.locale })"
          )
            Timeago(:datetime="review.createdAt" :auto-update="60" :locale="$i18n.locale")

      .review-card-review
        p.review-card-review__text {{ review.content }}

      .review-card-detail(v-if="isDetailed")
        .d-flex
          time.review-card-detail__item {{ formatToFullDate({ date: new Date(review.createdAt), locale: $i18n.locale }) }}
          time.review-card-detail__item(v-if="review.createdAt !== review.updatedAt")
            | {{ $t('general.updatedAt') }}
            | {{ formatToFullDate({ date: new Date(review.updatedAt), locale: $i18n.locale }) }}
        .review-card-detail__bar
          button.review-card-detail__item.review-card-detail__item--button(@click="$emit('on-click-like-count')")
            strong {{ like.count }}
            span {{ $t('general.likes') }}
          button.review-card-detail__item.review-card-detail__item--button(@click="$emit('on-click-reply-count')")
            strong {{ reply.count }}
            span {{ $t('general.replies') }}

      client-only
        .review-card-actions
          .review-card-actions-item.like-button(role="button" :class="[likedClass]" @click="toggleLike")
            PaperButton.review-card-actions-item__button(:width="36" :height="36")
              AppIcon(v-if="like.isActive" name="ri:heart-3-fill" :width="18" :height="18")
              AppIcon(v-else name="ri:heart-3-line" :width="18" :height="18")
            span.review-card-actions-item__label
              template(v-if="isDetailed")
                template(v-if="like.isActive") {{ $t('general.unlike') }}
                template(v-else) {{ $t('general.like') }}
              template(v-else)
                template(v-if="like.count <= 0") {{ $t('general.like') }}
                template(v-else) {{ like.count }}

          .review-card-actions-item.reply-button(role="button" @click="handleClickReply")
            PaperButton.review-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:chat-1-line" :width="18" :height="18")
            span.review-card-actions-item__label
              template(v-if="isDetailed") {{ $t('general.reply') }}
              template(v-else)
                template(v-if="reply.count <= 0") {{ $t('general.reply') }}
                template(v-else) {{ reply.count }}

          template(v-if="$auth.loggedIn && $auth.user.username === review.user.username")
            .review-card-actions-item.edit-button(role="button" @click="handleClickEdit")
              PaperButton.review-card-actions-item__button(:width="36" :height="36")
                AppIcon(name="ri:edit-line" :width="18" :height="18")
              span.review-card-actions-item__label {{ $t('general.edit') }}

            .review-card-actions-item.delete-button(role="button" @click="handleClickDelete")
              PaperButton.review-card-actions-item__button(:width="36" :height="36")
                AppIcon(name="ri:delete-bin-6-line" :width="18" :height="18")
              span.review-card-actions-item__label {{ $t('general.delete') }}

          vs-tooltip.review-card-actions.share-button.ms-auto(not-arrow shadow role="button")
            PaperButton.review-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:share-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.share') }}

          vs-tooltip.review-card-actions-item.report-button(not-arrow shadow role="button")
            PaperButton.review-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:flag-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.report') }}

  template(v-if="fetchState.pending")
    .d-flex.justify-content-center.my-4
      p Loading replies
  template(v-else-if="fetchState.error")
    .d-flex.justify-content-center.my-4
      span {{ fetchState.error }}
  template(v-else)
    // Replies
    .review-card-replies(v-if="reply.items && reply.items.length > 0")
      h4.review-card-replies__title {{ $t('general.replies') }}
      ReplyCard(v-for="replyItem in reply.items" :key="replyItem.id" :reply="replyItem")
      vs-button.ms-auto.my-3(
        v-if="!isDetailed && reply.items.length >= 2"
        border
        :to="localePath({ name: 'Comment-id', params: { id: review.id } })"
      )
        | {{ $t('reply.seeAllReplies') }}
      vs-button.ms-auto.my-3(v-if="isDetailed && !reply.isFinished" border :loading="reply.isBusy" @click="loadMoreReply")
        AppIcon.me-2(name="ri:loader-4-line")
        | {{ $t('reply.loadMore') }}

      .d-flex.justify-content-center.my-4(v-if="reply.isFinished")
        p {{ $t('reply.repliesIsFinished') }}

  ReplyDialog(:is-open="form.reply.isOpen" :summary="review" @on-close="form.reply.isOpen = false")
  EditCommentDialog(:is-open="form.edit.isOpen" :comment="review" @on-close="form.edit.isOpen = false" @on-confirm="handleEdit")
  DeleteCommentDialog(:is-open="form.delete.isOpen" :comment="review" @on-close="form.delete.isOpen = false" @on-confirm="handleDelete")
</template>

<script lang="ts">
import { defineComponent, useContext, useStore, useFetch, ref, reactive, computed } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import type { ReviewTypes } from '@/types'
import { formatToFullDate } from '@/utils/date'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { ReplyCard } from '@/components/Card'
import { ReplyDialog, EditCommentDialog, DeleteCommentDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    PaperButton,
    AppIcon,
    ReplyCard,
    ReplyDialog,
    EditCommentDialog,
    DeleteCommentDialog
  },
  props: {
    review: {
      type: Object,
      required: true
    },
    isDetailed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const baseClassName = 'review-card'
    const rootRef: Ref<HTMLElement | null> = ref(null)

    const context = useContext()
    const store = useStore()

    const form = reactive({
      reply: {
        isOpen: false
      },
      edit: {
        isOpen: false
      },
      delete: {
        isOpen: false
      }
    })

    const like = reactive({
      isActive: false,
      count: props.review.likeCount || 0
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

    const handleClickEdit = () => {
      form.edit.isOpen = true
      emit('on-click-edit')
    }

    const handleEdit = async (review: ReviewTypes) => {
      const { data } = await context.$api.rest.review.editReview({
        id: review.id,
        content: review.content,
        media: null
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: 'Edit successfully',
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        await store.commit('review/EDIT_REVIEW', {
          id: review.id,
          review: {
            content: review.content
          }
        })

        form.edit.isOpen = false
        emit('on-edit-success', data)
      }
    }

    const handleClickDelete = () => {
      form.delete.isOpen = true
      emit('on-click-delete')
    }

    const handleDelete = async () => {
      const { data } = await context.$api.rest.review.deleteReview({
        id: props.review.id
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: 'Delete successfully',
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        await store.commit('review/DELETE_REVIEW', props.review.id)

        form.delete.isOpen = false
        emit('on-delete-success')
      }
    }

    const reply = reactive({
      count: props.review.replyCount || 0,
      isBusy: false,
      isFinished: false,
      page: 1,
      limit: props.isDetailed ? 10 : 2,
      items: []
    })

    const { fetch, fetchState } = useFetch(async () => {
      if (props.review.replyCount > 0) {
        const repliesResult = await context.$api.rest.review.fetchReplies({
          reviewId: props.review.id,
          page: reply.page,
          limit: reply.limit
        })
        reply.items = repliesResult
      }
    })

    const loadMoreReply = async () => {
      reply.isBusy = true

      const repliesResult = await context.$api.rest.review.fetchReplies({
        reviewId: props.review.id,
        page: (reply.page += 1),
        limit: reply.limit
      })

      if (repliesResult && repliesResult.length > 0) {
        reply.items = repliesResult
      } else {
        reply.isFinished = true
      }

      reply.isBusy = false
    }

    const detailedClass = computed(() => {
      if (props.isDetailed) {
        return `${baseClassName}--detailed`
      }
    })

    return {
      rootRef,
      fetch,
      fetchState,
      form,
      like,
      toggleLike,
      likedClass,
      handleClickReply,
      handleClickEdit,
      handleEdit,
      handleClickDelete,
      handleDelete,
      reply,
      loadMoreReply,
      detailedClass,
      formatToFullDate
    }
  }
})
</script>

<style lang="scss" src="./ReviewCard.component.scss"></style>
