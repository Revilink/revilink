<template lang="pug">
ClientOnly
  .widget.link-extra-widget
    // Head
    .widget-head
      .widget-head__title {{ $t('widget.siteExtra.title') }}

    // Body
    .widget__body
      nav.link-extra-widget-nav
        a.link-extra-widget-nav-item(
          :href="`http://web.archive.org/web/${new Date().getFullYear()}0000000000*/${$route.query.link}`"
          target="_blank"
        )
          AppIcon.link-extra-widget-nav-item__icon(:width="20" :height="20" name="ri:archive-2-line")
          span.link-extra-widget-nav-item__title {{ $t('widget.siteExtra.nav.webArchive.title') }}
          AppIcon.link-extra-widget-nav-item__icon.ms-1(name="majesticons:external-link-line")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup() {}
})
</script>

<style lang="scss" src="./LinkExtraWidget.component.scss"></style>
