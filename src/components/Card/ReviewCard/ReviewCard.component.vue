<template lang="pug">
.review-card
  vs-avatar.review-card__avatar(circle size="48")
    img(v-if="true" src="https://i.pravatar.cc/600?img=52" alt="avatar")
    AppIcon(v-else name="charm:globe" color="var(--color-text-01)" :width="22" :height="22")

  .review-card__body
    .review-card-meta
      strong.review-card-meta__user Selim Doyranlı
      time.review-card-meta__date &nbsp; • 22 Mayıs 2023

    .review-card-review
      p.review-card-review__text
        | Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vitae tenetur ad asperiores tempora, voluptatibus ut
        | labore numquam quis natus eius nostrum? Dolorum
        | autem eius reprehenderit officia maxime at temporibus.

    .review-card-actions
      .review-card-actions-item.review-card-actions-item--like
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(name="ri:heart-3-line" :width="18" :height="18")
        span.review-card-actions-item__label 21

      .review-card-actions-item.review-card-actions-item--reply
        PaperButton.review-card-actions-item__button(:width="36" :height="36")
          AppIcon(name="ri:chat-1-line" :width="18" :height="18")
        span.review-card-actions-item__label 6

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
  setup() {}
})
</script>

<style lang="scss" src="./ReviewCard.component.scss"></style>
