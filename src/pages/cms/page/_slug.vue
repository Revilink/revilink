<template lang="pug">
.page.cms-page
  .row
    .col-12.col-lg-8
      template(v-if="fetchState.pending")
        .d-flex.justify-content-center.my-4
          AppLoading.py-base

      template(v-else-if="fetchState.error")
        .d-flex.justify-content-center.my-4
          span {{ fetchState.error }}

      template(v-else)
        nuxt-content.app-content(:document="doc")
    .col-12.col-lg-4.d-flex.justify-content-end
      .col-12.col-lg-11.vh-100
        aside.sidebar
          CmsPagesWidget
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useFetch, useMeta, ref, watch, computed } from '@nuxtjs/composition-api'
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

    const doc: any = ref(null)

    const { fetch, fetchState } = useFetch(async () => {
      try {
        const result = await context.$content(route.value.params.slug).fetch()
        doc.value = result
      } catch {
        context.redirect(context.localePath({ name: 'index' }))
      }
    })

    watch(
      () => route.value.params.slug,
      async value => {
        if (value) {
          await fetch()
        }
      }
    )

    const pageTitle = computed(() => {
      return doc.value?.body?.children[0]?.children[1]?.value || route.value.params.slug
    })

    useMeta(
      () =>
        ({
          title: pageTitle.value
        } as any)
    )

    return {
      fetch,
      fetchState,
      doc
    }
  },
  head: {}
})
</script>

<style lang="scss" src="./Cms.page.scss"></style>
