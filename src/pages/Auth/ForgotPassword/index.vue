<template lang="pug">
.page.forgot-password-page
  .col.col-lg-8.col-xl-6
    ForgotPasswordForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ForgotPasswordForm } from '@/components/Form'

export default defineComponent({
  components: {
    ForgotPasswordForm
  },
  layout: 'Auth/Auth.layout',
  setup() {}
})
</script>

<style lang="scss" src="./ForgotPassword.page.scss"></style>
