<template lang="pug">
nav.settings-nav
  NuxtLink.settings-nav-item(:to="localePath({ name: 'Settings-Profile' })")
    AppIcon.settings-nav-item__icon(name="carbon:user")
    span.settings-nav-item__title {{ $t('general.profile') }}

  NuxtLink.settings-nav-item(:to="localePath({ name: 'Reviews' })")
    AppIcon.settings-nav-item__icon(name="carbon:tools")
    span.settings-nav-item__title {{ $t('general.account') }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup() {}
})
</script>

<style lang="scss" src="./SettingsNav.component.scss"></style>
