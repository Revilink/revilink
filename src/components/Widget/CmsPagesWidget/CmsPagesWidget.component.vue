<template lang="pug">
.widget.cms-pages-widget
  .widget-head
    strong.widget-head__title {{ $t('widget.cmsPages.title') }}
  .widget__body
    nav.widget-nav
      template(v-for="item in nav.items")
        NuxtLink.widget-nav-item(:key="item.link" :to="localePath({ name: 'cms-page-slug', params: { slug: item.link } })")
          span.widget-nav-item__title {{ item.title }}
</template>

<script lang="ts">
import { defineComponent, useContext, ref, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const context = useContext()

    const active = ref(context.route.value.query.page)

    const nav = reactive({
      items: [
        {
          title: `🔗 ${context.i18n.t('cms.about.title')}`,
          link: context.i18n.t('cms.about.route')
        },
        {
          title: `📝 ${context.i18n.t('cms.terms.title')}`,
          link: context.i18n.t('cms.terms.route')
        },
        {
          title: `🛡️ ${context.i18n.t('cms.privacyPolicy.title')}`,
          link: context.i18n.t('cms.privacyPolicy.route')
        },
        {
          title: `🍪 ${context.i18n.t('cms.cookiePolicy.title')}`,
          link: context.i18n.t('cms.cookiePolicy.route')
        },
        {
          title: `⛏️ ${context.i18n.t('cms.revilinkDataScraper.title')}`,
          link: context.i18n.t('cms.revilinkDataScraper.route')
        }
      ]
    })

    return {
      active,
      nav
    }
  }
})
</script>

<style lang="scss" src="./CmsPagesWidget.component.scss"></style>
