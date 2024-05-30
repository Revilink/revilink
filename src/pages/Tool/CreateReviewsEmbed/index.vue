<!-- eslint-disable max-len -->
<template lang="pug">
.page.create-reviews-embed-page
  CreateReviewsEmbedForm
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { CreateReviewsEmbedForm } from '@/components/Form'

export default defineComponent({
  components: {
    CreateReviewsEmbedForm
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()

    useMeta(
      () =>
        ({
          title: context.i18n.t('seo.createReviewsEmbed.title'),
          meta: [
            {
              hid: 'og:title',
              name: 'og:title',
              content: context.i18n.t('seo.createReviewsEmbed.title')
            },
            {
              hid: 'twitter:title',
              name: 'twitter:title',
              content: context.i18n.t('seo.createReviewsEmbed.title')
            },
            {
              hid: 'description',
              name: 'description',
              content: context.i18n.t('seo.createReviewsEmbed.description')
            },
            {
              hid: 'og:description',
              name: 'og:description',
              content: context.i18n.t('seo.createReviewsEmbed.description')
            },
            {
              hid: 'twitter:description',
              name: 'twitter:description',
              content: context.i18n.t('seo.createReviewsEmbed.description')
            }
          ]
        } as any)
    )
  },
  head: {}
})
</script>

<style lang="scss" src="./CreateReviewsEmbed.page.scss"></style>
