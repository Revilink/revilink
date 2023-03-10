<template lang="pug">
.review-card
  vs-avatar.review-card__avatar(circle size="48")
    AppIcon(v-if="review.isAnonymous" name="ooui:user-anonymous" color="var(--color-text-01)" :width="22" :height="22")
    nuxt-link(v-else :to="localePath({ name: 'profile', params: { username: review.user.username } })" :title="review.user.name")
      img(:src="review.user?.avatar" alt="avatar")

  .review-card__body
    .review-card-meta
      strong.review-card-meta__user
        template(v-if="review.isAnonymous") {{ $t('general.anonymous') }}
        nuxt-link(v-else :to="localePath({ name: 'profile', params: { username: review.user.username } })" :title="review.user.name")
          | {{ review.user?.name }}
      time.review-card-meta__date
        nuxt-link(:to="localePath({ name: 'comment', params: { id: review.id } })" :title="review.createdAt") • {{ review.createdAt }}

    .review-card-review
      p.review-card-review__text {{ review.content }}

    .review-card-actions
      .review-card-actions-item.like-button(role="button" :class="[likedClass]" @click="toggleLike")
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(v-if="isLiked" name="ri:heart-3-fill" :width="18" :height="18")
          AppIcon(v-else name="ri:heart-3-line" :width="18" :height="18")
        span.review-card-actions-item__label
          template(v-if="likeCount <= 0") {{ $t('general.like') }}
          template(v-else) {{ likeCount }}

      .review-card-actions-item.reply-button(role="button")
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(name="ri:chat-1-line" :width="18" :height="18")
        span.review-card-actions-item__label
          template(v-if="review.replyCount <= 0") {{ $t('general.reply') }}
          template(v-else) {{ review.replyCount }}

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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    PaperButton,
    AppIcon
  },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  setup(props) {
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

    return {
      isLiked,
      likeCount,
      toggleLike,
      likedClass
    }
  }
})
</script>

<style lang="scss" src="./ReviewCard.component.scss"></style>
