<template lang="pug">
.layout.default-layout
  // App Preloader
  AppPreloader

  // App Header
  AppHeader

  // Main
  .layout__inner
    .container
      .router-view
        Nuxt

  // Login Dialog
  LoginDialog
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppPreloader } from '@/components/Preloader'
import { AppHeader } from '@/components/Header'
import { LoginDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    AppPreloader,
    AppHeader,
    LoginDialog
  },
  setup() {}
})
</script>

<style lang="scss" src="./Default.layout.scss"></style>
