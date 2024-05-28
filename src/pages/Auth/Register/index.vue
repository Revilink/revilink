<template lang="pug">
.page.register-page
  .col.col-lg-8.col-xl-6
    RegisterForm
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { RegisterForm } from '@/components/Form'

export default defineComponent({
  components: {
    RegisterForm
  },
  layout: 'Auth/Auth.layout',
  setup() {
    const context = useContext()

    if (context.$auth.user) {
      context.redirect(context.localePath('/'))
    }

    useMeta(
      () =>
        ({
          title: context.i18n.t('general.register')
        } as any)
    )
  },
  head: {}
})
</script>

<style lang="scss" src="./Register.page.scss"></style>
