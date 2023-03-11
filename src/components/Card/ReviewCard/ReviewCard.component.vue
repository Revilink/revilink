<template lang="pug">
.review-card(:class="[detailedClass]")
  .review-card__inner
    vs-avatar.review-card__avatar(circle size="48")
      AppIcon(v-if="review.isAnonymous" name="ooui:user-anonymous" color="var(--color-text-01)" :width="22" :height="22")
      nuxt-link(v-else :to="localePath({ name: 'profile', params: { username: review.user.username } })" :title="review.user.name")
        img(:src="review.user?.avatar" alt="avatar")

    .review-card__body
      .review-card-meta
        .review-card-meta__user
          template(v-if="review.isAnonymous") {{ $t('general.anonymous') }}
          nuxt-link(v-else :to="localePath({ name: 'profile', params: { username: review.user.username } })" :title="review.user.name")
            strong {{ review.user?.name }} &nbsp;
            span @{{ review.user?.username }}
        time.review-card-meta__date
          | • &nbsp;
          nuxt-link(:to="localePath({ name: 'comment', params: { id: review.id } })" :title="review.createdAt") {{ review.createdAt }}

      .review-card-review
        p.review-card-review__text {{ review.content }}

      .review-card-detail(v-if="isDetailed")
        .d-flex
          time.review-card-detail__item {{ review.createdAt }}
          time.review-card-detail__item.ms-4(v-if="review.updatedAt") • {{ $t('general.updatedAt') }} {{ review.createdAt }}
        .review-card-detail__bar
          button.review-card-detail__item.review-card-detail__item--button
            strong {{ likeCount }}
            span {{ $t('general.like') }}
          button.review-card-detail__item.review-card-detail__item--button
            strong {{ review.replyCount }}
            span {{ $t('general.reply') }}

      .review-card-actions
        .review-card-actions-item.like-button(role="button" :class="[likedClass]" @click="toggleLike")
          PaperButton.review-card-actions-item__button(:width="36" :height="36")
            AppIcon(v-if="isLiked" name="ri:heart-3-fill" :width="18" :height="18")
            AppIcon(v-else name="ri:heart-3-line" :width="18" :height="18")
          span.review-card-actions-item__label
            template(v-if="isDetailed")
              template(v-if="isLiked") {{ $t('general.unlike') }}
              template(v-else) {{ $t('general.like') }}
            template(v-else)
              template(v-if="likeCount <= 0") {{ $t('general.like') }}
              template(v-else) {{ likeCount }}

        .review-card-actions-item.reply-button(role="button" @click="reply")
          PaperButton.review-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:chat-1-line" :width="18" :height="18")
          span.review-card-actions-item__label
            template(v-if="isDetailed") {{ $t('general.reply') }}
            template(v-else)
              template(v-if="review.replyCount <= 0") {{ $t('general.reply') }}
              template(v-else) {{ review.replyCount }}

        .review-card-actions-item.edit-button(v-if="true" role="button" @click="edit")
          PaperButton.review-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:edit-line" :width="18" :height="18")
          span.review-card-actions-item__label {{ $t('general.edit') }}

        vs-tooltip.review-card-actions.share-button.ms-auto(role="button")
          PaperButton.review-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:share-line" :width="18" :height="18")
          template(#tooltip)
            span {{ $t('general.share') }}

        vs-tooltip.review-card-actions-item.report-button(role="button")
          PaperButton.review-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:flag-line" :width="18" :height="18")
          template(#tooltip)
            span {{ $t('general.report') }}

  .review-card-replies(v-if="replies && replies.length > 0")
    h4.review-card-replies__title {{ $t('general.replies') }}
    ReplyCard(v-for="replyItem in replies" :key="replyItem.id" :reply="replyItem")
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch, ref, computed } from '@nuxtjs/composition-api'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { ReplyCard } from '@/components/Card'

export default defineComponent({
  components: {
    PaperButton,
    AppIcon,
    ReplyCard
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

    const context = useContext()

    const isLiked = ref(false)
    const likeCount = ref(props.review.likeCount)

    const toggleLike = () => {
      isLiked.value = !isLiked.value

      if (isLiked.value) {
        likeCount.value += 1
      } else {
        likeCount.value -= 1
      }
    }

    const likedClass = computed(() => {
      const likeButtonClassName = 'like-button'

      if (isLiked.value) {
        return `${likeButtonClassName}--liked`
      }
    })

    const reply = () => {
      emit('on-click-reply')
    }

    const edit = () => {
      emit('on-click-edit')
    }

    const replies = ref([])

    const { fetch, fetchState } = useFetch(async () => {
      const repliesResult = await context.$api.rest.review.fetchReplies({
        reviewId: props.review.id
      })
      replies.value = repliesResult
    })

    const detailedClass = computed(() => {
      if (props.isDetailed) {
        return `${baseClassName}--detailed`
      }
    })

    return {
      fetch,
      fetchState,
      isLiked,
      likeCount,
      toggleLike,
      likedClass,
      reply,
      edit,
      replies,
      detailedClass
    }
  }
})
</script>

<style lang="scss" src="./ReviewCard.component.scss"></style>
