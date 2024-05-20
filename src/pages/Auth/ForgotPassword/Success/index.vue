<template lang="pug">
.page.forgot-password-success-page
  .col.col-lg-8.col-xl-6
    BasicState(:title="$t('form.resetPassword.success.title')" :description="$t('form.resetPassword.success.description')")
      template(#head)
        img(src="@/assets/media/elements/state/payment_success.svg" width="256")
      template(#footer)
        vs-button.my-10(:to="localePath({ name: 'Auth-Login' })") {{ $t('form.login.title') }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BasicState } from '@/components/State'

export default defineComponent({
  components: {
    BasicState
  },
  layout: 'Auth/Auth.layout',
  setup() {}
})
</script>

<style lang="scss" src="./ForgotPasswordSuccess.page.scss"></style>
