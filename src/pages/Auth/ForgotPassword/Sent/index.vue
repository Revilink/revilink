<template lang="pug">
.page.forgot-password-sent-page
  .col.col-lg-8.col-xl-6
    BasicState(:title="$t('form.forgotPassword.sent.title')" :description="$t('form.forgotPassword.sent.description')")
      template(#head)
        img(src="@/assets/media/elements/state/card.svg" width="256")
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

<style lang="scss" src="./ForgotPasswordSent.page.scss"></style>
