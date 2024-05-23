<template lang="pug">
.page.home-page
  .col-xl-8.col-lg-9.mx-auto
    .avatar-group-stack
      .avatar-group
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_8.png")
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_1.png")
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_3.png")
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_4.png")
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_7.png")
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_5.png")
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_2.png")
        .avatar-group-item
          img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_6.png")
    h1.home-page__title(v-html="$t('hero.home.title')")
    ReviewSearchForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ReviewSearchForm } from '@/components/Form'

export default defineComponent({
  components: {
    ReviewSearchForm
  },
  layout: 'Home/Home.layout',
  setup() {}
})
</script>

<style lang="scss" src="./Home.page.scss"></style>
