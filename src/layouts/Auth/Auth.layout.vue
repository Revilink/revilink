<template lang="pug">
.layout.auth-layout
  // App Preloader
  AppPreloader

  // App Header
  AppHeader

  // Avatar Group Layer
  .avatar-group-layer
    .avatar-group.avatar-group--left
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_1.png")
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_7.png")
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_3.png")
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_4.png")

    .avatar-group.avatar-group--right
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_5.png")
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_8.png")
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_2.png")
      img.avatar-group__item(src="@/assets/media/elements/avatar_layer/avatar_layer_avatar_6.png")

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
