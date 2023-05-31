<template lang="pug">
.page.register-page
  .col.col-lg-8.col-xl-6
    RegisterForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { RegisterForm } from '@/components/Form'

export default defineComponent({
  components: {
    RegisterForm
  },
  layout: 'Auth/Auth.layout',
  setup() {}
})
</script>

<style lang="scss" src="./Register.page.scss"></style>
