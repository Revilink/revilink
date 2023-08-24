<template lang="pug">
.page.login-page
  .col.col-lg-8.col-xl-6
    LoginForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { LoginForm } from '@/components/Form'

export default defineComponent({
  components: {
    LoginForm
  },
  layout: 'Auth/Auth.layout',
  setup() {}
})
</script>

<style lang="scss" src="./Login.page.scss"></style>
