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

        template(v-if="siteMeta?.widget")
          a.link-extra-widget-nav-item.link-extra-widget-nav-item--announcement-price-history(
            v-if="siteMeta?.widget?.announcementPriceHistory"
            @click.prevent.capture="onClickShowAnnouncementsPriceHistory"
          )
            AppIcon.link-extra-widget-nav-item__icon(:width="20" :height="20" name="ri:line-chart-fill")
            span.link-extra-widget-nav-item__title {{ $t('widget.siteExtra.nav.widget.announcementPriceHistory.showPriceHistory') }}
            img.link-extra-widget-nav-item__icon.ms-1(:src="siteMeta.icon" width="16" height="16")

    // Announcements Price History Dialog
    template(v-if="siteMeta?.widget?.announcementPriceHistory")
      vs-dialog.announcement-price-history-dialog(v-model="isOpenAnnouncementsPriceHistoryDialog" scroll)
        template(#header)
          h3.announcement-price-history-dialog__title {{ $t('widget.siteExtra.nav.widget.announcementPriceHistory.title') }}
        p(v-html="siteMeta.widget.announcementPriceHistory")
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  props: {
    siteMeta: {
      type: Object,
      required: true,
      default: null
    }
  },
  setup() {
    const isOpenAnnouncementsPriceHistoryDialog = ref(false)

    const onClickShowAnnouncementsPriceHistory = () => {
      isOpenAnnouncementsPriceHistoryDialog.value = true
    }

    return {
      isOpenAnnouncementsPriceHistoryDialog,
      onClickShowAnnouncementsPriceHistory
    }
  }
})
</script>

<style lang="scss" src="./LinkExtraWidget.component.scss"></style>
