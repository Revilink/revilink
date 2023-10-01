<template lang="pug">
.page.cms-page
  .row
    .col.col-8
      template(v-if="fetchState.pending")
        .d-flex.justify-content-center.my-4
          AppLoading.py-base

      template(v-else-if="fetchState.error")
        .d-flex.justify-content-center.my-4
          span {{ fetchState.error }}

      template(v-else)
        nuxt-content.app-content(:document="doc")
    .col.col-4
      aside.sidebar.col-11
        CmsPagesWidget
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useFetch, ref, watch } from '@nuxtjs/composition-api'
import { CmsPagesWidget } from '@/components/Widget'
import { AppLoading } from '@/components/Loading'

export default defineComponent({
  components: {
    CmsPagesWidget,
    AppLoading
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const route = useRoute()

    const doc = ref(null)

    const { fetch, fetchState } = useFetch(async () => {
      try {
        const result = await context.$content(route.value.query.page).fetch()
        doc.value = result
      } catch {
        context.redirect(context.localePath({ name: 'index' }))
      }
    })

    watch(
      () => route.value.query.page,
      async value => {
        if (value) {
          await fetch()
        }
      }
    )

    return {
      fetch,
      fetchState,
      doc
    }
  }
})
</script>

<style lang="scss" src="./Cms.page.scss"></style>
