<template lang="pug">
.review-card
  vs-avatar.review-card__avatar(circle size="48")
    AppIcon(v-if="review.isAnonymous" name="ooui:user-anonymous" color="var(--color-text-01)" :width="22" :height="22")
    img(v-else :src="review.user?.avatar" alt="avatar")

  .review-card__body
    .review-card-meta
      strong.review-card-meta__user
        template(v-if="review.isAnonymous") Anonymous
        template(v-else) {{ review.user?.name }}
      time.review-card-meta__date &nbsp; • {{ review.createdAt }}

    .review-card-review
      p.review-card-review__text {{ review.content }}

    .review-card-actions
      .review-card-actions-item.review-card-actions-item--like
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(name="ri:heart-3-line" :width="18" :height="18")
        span.review-card-actions-item__label
          template(v-if="review.likeCount <= 0") Like
          template(v-else) {{ review.likeCount }}

      .review-card-actions-item.review-card-actions-item--reply
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(name="ri:chat-1-line" :width="18" :height="18")
        span.review-card-actions-item__label
          template(v-if="review.replyCount <= 0") Reply
          template(v-else) {{ review.replyCount }}

      vs-tooltip.review-card-actions-item.ms-auto.review-card-actions-item--share
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(name="ri:share-line" :width="18" :height="18")
        template(#tooltip)
          span Share

      vs-tooltip.review-card-actions-item.review-card-actions-item--share
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(name="ri:flag-line" :width="18" :height="18")
        template(#tooltip)
          span Report
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
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
  setup() {}
})
</script>

<style lang="scss" src="./ReviewCard.component.scss"></style>
