<template lang="pug">
.page.forgot-password-reset-page
  .col.col-lg-8.col-xl-6
    ResetPasswordForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ResetPasswordForm } from '@/components/Form'

export default defineComponent({
  components: {
    ResetPasswordForm
  },
  layout: 'Auth/Auth.layout',
  setup() {}
})
</script>

<style lang="scss" src="./ForgotPasswordReset.page.scss"></style>
