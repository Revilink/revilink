<template lang="pug">
.page.home-page
  .col-lg-7.mx-auto
    h1.home-page__title(v-html="$t('hero.home.title')")
    h2.home-page__description {{ $t('hero.home.description') }}

    ReviewSearchForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ReviewSearchForm } from '@/components/Form'

export default defineComponent({
  components: {
    ReviewSearchForm
  },
  layout: 'Home/Home.layout',
  setup() {}
})
</script>

<style lang="scss" src="./Home.page.scss"></style>
