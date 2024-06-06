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

  // Link Collections Dialog
  LinkCollectionsDialog

  // Login Dialog
  LoginDialog

  // Cookie Dialog
  CookieDialog
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppPreloader } from '@/components/Preloader'
import { AppHeader } from '@/components/Header'
import { LinkCollectionsDialog, LoginDialog, CookieDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    AppPreloader,
    AppHeader,
    LinkCollectionsDialog,
    LoginDialog,
    CookieDialog
  },
  setup() {}
})
</script>

<style lang="scss" src="./Default.layout.scss"></style>
