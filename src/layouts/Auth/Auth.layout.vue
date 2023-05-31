<template lang="pug">
.layout.auth-layout
  // App Preloader
  AppPreloader

  // App Header
  AppHeader

  // Memphis Layer
  .memphis-layer
    img.memphis-layer__item(src="@/assets/media/elements/memphis/memphis-15.png")
    img.memphis-layer__item(src="@/assets/media/elements/memphis/memphis-10.png")
    img.memphis-layer__item(src="@/assets/media/elements/memphis/memphis-13.png")

  // Main
  .layout__inner
    .container
      .router-view
        nuxt
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
