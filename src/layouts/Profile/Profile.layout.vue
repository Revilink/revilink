<template lang="pug">
.layout.profile-layout
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

  // Cookie Dialog
  CookieDialog
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppPreloader } from '@/components/Preloader'
import { AppHeader } from '@/components/Header'
import { LoginDialog, CookieDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    AppPreloader,
    AppHeader,
    LoginDialog,
    CookieDialog
  },
  setup() {}
})
</script>

<style lang="scss" src="./Profile.layout.scss"></style>
