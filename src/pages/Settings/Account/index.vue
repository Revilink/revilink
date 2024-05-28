<template lang="pug">
.page.account-settings-page
  AccountSettingsForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AccountSettingsForm } from '@/components/Form'

export default defineComponent({
  components: {
    AccountSettingsForm
  },
  layout: 'Settings/Settings.layout',
  middleware: ['auth'],
  setup() {}
})
</script>

<style lang="scss" src="./AccountSettings.page.scss"></style>
