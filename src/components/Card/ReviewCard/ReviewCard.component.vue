<template lang="pug">
.review-card(ref="rootRef" :class="[detailedClass]" :data-id="review.id")
  slot(name="prepend")

  .review-card__inner
    .review-card__avatar(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.AVATAR)" circle size="48")
      NuxtLink(:to="localePath({ name: 'Profile', query: { username: review.user.username } })" :title="review.user.username")
        AppAvatar(:user="review.user" :size="48")

    .review-card__body
      slot(name="bodyPrepend")
      .review-card-meta
        .review-card-meta__user
          NuxtLink(:to="localePath({ name: 'Profile', query: { username: review.user.username } })" :title="review.user.username")
            strong {{ review.user.username }}
        .review-card-meta__date
          span.d-none.d-md-block •&nbsp;
          NuxtLink(
            :to="localePath({ name: 'Comment', query: { id: review.id } })"
            :title="formatToFullDate({ date: new Date(review.createdAt), locale: $i18n.locale })"
          )
            ClientOnly
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
          button.review-card-detail__item.review-card-detail__item--button.pointer-events-none(auth-control)
            strong {{ like.count }}
            span {{ $t('general.likes') }}
          button.review-card-detail__item.review-card-detail__item--button.pointer-events-none(auth-control)
            strong {{ reply.count }}
            span {{ $t('general.replies') }}

      client-only
        .review-card-actions
          template(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.COMMENT_REACTIONS)")
            .review-card-actions-item.like-button(
              v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.LIKE)"
              role="button"
              auth-control
              :class="[likedClass]"
              @click="toggleLike"
            )
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

            .review-card-actions-item.reply-button(
              v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.REPLY)"
              role="button"
              auth-control
              @click="handleClickReply"
            )
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

          vs-tooltip.review-card-actions.share-button.ms-auto(v-if="false" not-arrow shadow role="button")
            PaperButton.review-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:share-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.share') }}

          vs-tooltip.review-card-actions-item.report-button(v-if="false" not-arrow shadow role="button")
            PaperButton.review-card-actions-item__button(:width="36" :height="36")
              AppIcon(name="ri:flag-line" :width="18" :height="18")
            template(#tooltip)
              span {{ $t('general.report') }}

      slot(name="bodyAppend")

  template(v-if="fetchState.pending")
    .d-flex.justify-content-center.my-4
      AppLoading.py-base(relative :title="$t('general.loadingReplies')")
  template(v-else-if="fetchState.error")
    .d-flex.justify-content-center.my-4
      span {{ fetchState.error }}
  template(v-else)
    // Replies
    .review-card-replies(
      v-if="withReplies && reply.items && reply.items.length > 0 && getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.REPLY)"
    )
      h4.review-card-replies__title {{ $t('general.replies') }}

      template(v-for="(replyItem, index) in reply.items")
        template(v-if="!isDetailed ? index < 2 : true")
          // Reply Card
          ReplyCard(:key="replyItem.id" :reply="replyItem" @on-edit-success="handleReplyEdit" @on-delete-success="handleReplyDelete")

      vs-button.ms-auto.my-3(
        v-if="!isDetailed && reply.items.length >= 2"
        border
        :to="localePath({ name: 'Comment', query: { id: review.id } })"
      )
        | {{ $t('reply.seeAllReplies') }}
      vs-button.load-more-button.ms-auto.my-3(
        v-if="isDetailed && !reply.isFinished"
        border
        :disabled="reply.isBusy"
        :loading="reply.isBusy"
        @click="loadMoreReply"
      )
        AppIcon.me-2(name="ri:loader-4-line")
        | {{ $t('reply.loadMore') }}

      .d-flex.justify-content-center.my-4(v-if="reply.isFinished")
        p {{ $t('reply.repliesIsFinished') }}

  ReplyDialog(
    :is-open="form.reply.isOpen"
    :review="review"
    :reply="review"
    @on-close="form.reply.isOpen = false"
    @on-submit-reply-success="handleReply"
  )
  EditCommentDialog(
    :is-open="form.edit.isOpen"
    :is-busy="form.edit.isBusy"
    :comment="review"
    @on-close="form.edit.isOpen = false"
    @on-confirm="handleEdit"
  )
  DeleteCommentDialog(
    :is-open="form.delete.isOpen"
    :is-busy="form.delete.isBusy"
    :comment="review"
    @on-close="form.delete.isOpen = false"
    @on-confirm="handleDelete"
  )

  slot(name="append")
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch, ref, reactive, computed } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import type { ReviewTypes } from '@/types'
import { formatToFullDate } from '@/utils/date'
import { useCommentLike, useReviewsEmbed } from '@/hooks'
import { AppAvatar } from '@/components/Avatar'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import ReplyCard from '@/components/Card/ReplyCard/ReplyCard.component.vue'
import { ReplyDialog, EditCommentDialog, DeleteCommentDialog } from '@/components/Dialog'
import { AppLoading } from '@/components/Loading'

export default defineComponent({
  components: {
    AppAvatar,
    PaperButton,
    AppIcon,
    ReplyCard,
    ReplyDialog,
    EditCommentDialog,
    DeleteCommentDialog,
    AppLoading
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
    },
    withReplies: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, { emit }) {
    const baseClassName = 'review-card'
    const rootRef: Ref<HTMLElement | null> = ref(null)

    const context = useContext()

    const { setReviewsEmbedOptions, reviewsEmbedOptionKeyEnum, getReviewsEmbedOption } = useReviewsEmbed()

    setReviewsEmbedOptions(context.route.value.fullPath)

    const form = reactive({
      reply: {
        isOpen: false
      },
      edit: {
        isOpen: false,
        isBusy: false
      },
      delete: {
        isOpen: false,
        isBusy: false
      }
    })

    const { like, getMyLike, toggleLike, likedClass } = useCommentLike(props.review)
    getMyLike()

    const handleClickReply = () => {
      form.reply.isOpen = true
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

    const reply = reactive({
      count: 0,
      isBusy: false,
      isFinished: false,
      page: 1,
      limit: props.isDetailed ? 10 : 2,
      items: [],
      meta: {}
    })

    const { fetch, fetchState } = useFetch(async () => {
      if (props.withReplies || getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.REPLY)) {
        const { data: replies } = await context.$api.rest.review.fetchReviews({
          populate: `populate=url,user,user.avatar,images`,
          filters: `filters[parent][id]=${props.review.id}`,
          pagination: `pagination[page]=${reply.page}&pagination[pageSize]=${reply.limit}`
        })

        if (replies) {
          reply.items = replies.items
          reply.meta = replies.meta
          reply.count = replies.meta?.pagination.total
        }
      }
    })

    const loadMoreReply = async () => {
      reply.isBusy = true

      const { data } = await context.$api.rest.review.fetchReviews({
        populate: `populate=url,user,user.avatar,images`,
        filters: `filters[parent][id]=${props.review.id}`,
        pagination: `pagination[page]=${(reply.page += 1)}&pagination[pageSize]=${reply.limit}`
      })

      if (data) {
        if (data.items.length > 0) {
          /* @ts-ignore */
          reply.items.push(...data.items)
        } else {
          reply.isFinished = true
        }
      }

      reply.isBusy = false
    }

    const handleReply = (replyPayload: ReviewTypes) => {
      /* @ts-ignore */
      reply.items.unshift(replyPayload)
      reply.count += 1
    }

    const handleReplyEdit = async () => {
      reply.page = 1
      await fetch()
    }

    const handleReplyDelete = async () => {
      reply.page = 1
      await fetch()
    }

    const detailedClass = computed(() => {
      if (props.isDetailed) {
        return `${baseClassName}--detailed`
      }
    })

    return {
      fetch,
      fetchState,
      rootRef,
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
      handleReply,
      handleReplyEdit,
      handleReplyDelete,
      detailedClass,
      formatToFullDate,
      reviewsEmbedOptionKeyEnum,
      getReviewsEmbedOption
    }
  }
})
</script>

<style lang="scss" src="./ReviewCard.component.scss"></style>
