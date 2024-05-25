<template lang="pug">
.page.forgot-password-page
  .col.col-lg-8.col-xl-6
    ForgotPasswordForm
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { ForgotPasswordForm } from '@/components/Form'

export default defineComponent({
  components: {
    ForgotPasswordForm
  },
  layout: 'Auth/Auth.layout',
  setup() {
    const context = useContext()

    useMeta(
      () =>
        ({
          title: context.i18n.t('form.forgotPassword.submit.action.title')
        } as any)
    )
  },
  head: {}
})
</script>

<style lang="scss" src="./ForgotPassword.page.scss"></style>
