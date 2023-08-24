<template lang="pug">
.layout.settings-layout
  // App Preloader
  AppPreloader

  // App Header
  AppHeader

  // Main
  .layout__inner
    .container
      .d-flex.mb-base
        i18n.d-flex.align-items-center(path="form.settings.settingsForUser")
          template(#user)
            NuxtLink(:to="localePath({ name: 'Profile', query: { username: $auth.user.username } })" :title="$auth.user.username")
              h2 {{ $auth.user.username }}
          template(#nbsp)
            span &nbsp;
          template(#text)
            h2 {{ $t('general.settingsFor', { model: null }) }}
      .row
        .col.col-12.col-xl-4
          .col.col-11
            section.sidebar.sidebar--sticky
              SettingsNav
        .col.col-12.col-xl-8
          .router-view
            nuxt
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppPreloader } from '@/components/Preloader'
import { AppHeader } from '@/components/Header'
import { SettingsNav } from '@/components/Nav'

export default defineComponent({
  components: {
    AppPreloader,
    AppHeader,
    SettingsNav
  },
  setup() {}
})
</script>

<style lang="scss" src="./Settings.layout.scss"></style>
