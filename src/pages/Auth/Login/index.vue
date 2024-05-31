<template lang="pug">
.page.login-page
  .col.col-lg-8.col-xl-6
    LoginForm
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { LoginForm } from '@/components/Form'

export default defineComponent({
  components: {
    LoginForm
  },
  layout: 'Auth/Auth.layout',
  middleware: ['auth'],
  setup() {
    const context = useContext()

    if (context.$auth.user) {
      context.redirect(context.localePath('/'))
    }

    useMeta(
      () =>
        ({
          title: context.i18n.t('general.login')
        } as any)
    )
  },
  head: {}
})
</script>

<style lang="scss" src="./Login.page.scss"></style>
