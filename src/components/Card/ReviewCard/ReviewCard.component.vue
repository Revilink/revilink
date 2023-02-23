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
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {}
})
</script>

<style lang="scss" src="./ReviewCard.component.scss"></style>
