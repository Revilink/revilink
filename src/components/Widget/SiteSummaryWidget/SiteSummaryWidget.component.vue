<template lang="pug">
ClientOnly
  .widget.site-summary-widget
    // Head
    .widget-head
      .widget-head__title {{ $t('widget.siteSummary.title') }}

    // Body
    .widget__body
      template(v-if="fetchState.pending")
        BlobLoading
        span.mx-auto.py-6.text-center.d-block {{ $t('widget.siteSummary.loading.description') }}
      template(v-else-if="fetchState.error")
        p {{ fetchState.error.message }}
      template(v-else)
        p.widget__description {{ site.summary }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useFetch, reactive } from '@nuxtjs/composition-api'
import { BlobLoading } from '@/components/Loading'

export default defineComponent({
  components: {
    BlobLoading
  },
  setup() {
    const context = useContext()
    const route = useRoute()

    const site = reactive({
      summary: ''
    })

    const { fetch, fetchState } = useFetch(async () => {
      if (process.client) {
        const { data } = await context.$api.rest.scraper.fetchAiDomainSummary({
          url: route.value.query.link
        })

        if (data) {
          site.summary = data.message.content
        }
      }
    })

    return {
      fetch,
      fetchState,
      site
    }
  }
})
</script>

<style lang="scss" src="./SiteSummaryWidget.component.scss"></style>
