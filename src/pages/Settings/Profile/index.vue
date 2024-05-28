<template lang="pug">
.page.profile-settings-page
  ProfileSettingsForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ProfileSettingsForm } from '@/components/Form'

export default defineComponent({
  components: {
    ProfileSettingsForm
  },
  layout: 'Settings/Settings.layout',
  middleware: ['auth'],
  setup() {}
})
</script>

<style lang="scss" src="./ProfileSettings.page.scss"></style>
