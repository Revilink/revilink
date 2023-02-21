<template lang="pug">
.page.home-page
  .col-lg-8.mx-auto
    AppLogo.home-page__logo(:height="44")
    h2.home-page__description(v-html="$t('hero.home.description')")

    ReviewSearchForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppLogo } from '@/components/Logo'
import { ReviewSearchForm } from '@/components/Form'

export default defineComponent({
  components: {
    AppLogo,
    ReviewSearchForm
  },
  layout: 'Home/Home.layout',
  setup() {}
})
</script>

<style lang="scss" src="./Home.page.scss"></style>
