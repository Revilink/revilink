<template lang="pug">
NuxtLink.url-link-card(:to="localePath({ name: 'Reviews', query: { link: url } })" :title="url")
  AppIcon.url-link-card__icon(name="material-symbols:link" color="var(--color-link-01)" :width="24" :height="24")
  span.url-link-card__title {{ url }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup() {}
})
</script>

<style lang="scss" src="./UrlLinkCard.component.scss"></style>
