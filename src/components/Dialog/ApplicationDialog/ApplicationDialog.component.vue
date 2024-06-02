<template lang="pug">
client-only
  vs-dialog.application-dialog(v-model="dialog.isOpen" role="dialog" tabindex="0" blur @close="handleClose")
    template(#header)
      h2.mb-2 {{ $t('general.application') }}

    .col-12
      .widget.mb-6
        .widget-head
          .widget-head__title {{ $t('general.websiteLanguage') }}
        .widget__body
          AppLangSwitch

      .widget
        .widget-head
          .widget-head__title {{ $t('general.more') }}
        .widget__body
          nav.widget-nav
            NuxtLink.widget-nav-item(:to="localePath({ name: 'Tool-CreateReviewsEmbed' })")
              AppIcon.widget-nav-item__icon(:width="20" :height="20" name="ri:code-s-slash-fill")
              span.widget-nav-item__title {{ $t('widget.applicationDialog.nav.createReviewsEmbed.title') }}
            a.widget-nav-item(
              href="https://chromewebstore.google.com/detail/revilink-webext/nliahkpjhgbbfgdlhanfcemeckbpbffd"
              title="Revilink Webext"
              target="_blank"
            )
              AppIcon.widget-nav-item__icon(:width="20" :height="20" name="logos:chrome-web-store")
              span.widget-nav-item__title {{ $t('widget.applicationDialog.nav.webext.title') }}
    .col-12
      CmsPagesWidget.h-full
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'
import { AppLangSwitch } from '@/components/Switch'
import { CmsPagesWidget } from '@/components/Widget'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppLangSwitch,
    CmsPagesWidget,
    AppIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const dialog = reactive({
      isOpen: props.isOpen
    })

    watch(
      () => props.isOpen,
      value => {
        if (value) {
          dialog.isOpen = true
        } else {
          dialog.isOpen = false
        }
      }
    )

    const handleClose = () => {
      dialog.isOpen = false

      emit('on-close')
    }

    return {
      dialog,
      handleClose
    }
  }
})
</script>

<style lang="scss" src="./ApplicationDialog.component.scss"></style>
