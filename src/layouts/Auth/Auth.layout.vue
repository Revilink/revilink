<template lang="pug">
.layout.auth-layout
  // App Preloader
  AppPreloader

  // App Header
  AppHeader

  // Avatar Group Layer
  .avatar-group-layer
    .avatar-group.avatar-group--left
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_1.png")
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_7.png")
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_3.png")
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_4.png")

    .avatar-group.avatar-group--right
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_5.png")
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_8.png")
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_2.png")
      .avatar-group-item
        img.avatar-group-item__image(src="/media/elements/avatar_layer/avatar_layer_avatar_6.png")

  // Main
  .layout__inner
    .container
      .router-view
        nuxt(keep-alive)
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppPreloader } from '@/components/Preloader'
import { AppHeader } from '@/components/Header'

export default defineComponent({
  components: {
    AppPreloader,
    AppHeader
  },
  setup() {}
})
</script>

<style lang="scss" src="./Auth.layout.scss"></style>
