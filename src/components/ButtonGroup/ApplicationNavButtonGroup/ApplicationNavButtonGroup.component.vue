<template lang="pug">
.application-nav-button-group
  vs-tooltip(not-arrow shadow bottom)
    .application-nav-button-group__item
      PaperButton(:width="42" :height="42" @click.native="dialog.application.isOpen = true")
        AppIcon(name="majesticons:applications-line" :width="26" :height="26")

    template(#tooltip)
      span {{ $t('general.application') }}

  template(v-if="!$auth.loggedIn && !$auth.user")
    vs-tooltip(not-arrow shadow bottom)
      .application-nav-button-group__item
        PaperButton(tag="NuxtLink" :to="localePath({ name: 'Auth-Login' })" :width="42" :height="42")
          AppIcon(name="ri:user-shared-line" :width="26" :height="26")

      template(#tooltip)
        span {{ $t('general.login') }}

  // Application Dialog
  ApplicationDialog(:is-open="dialog.application.isOpen" @on-close="dialog.application.isOpen = false")
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { ApplicationDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    PaperButton,
    AppIcon,
    ApplicationDialog
  },
  setup() {
    const dialog = reactive({
      application: {
        isOpen: false
      }
    })

    return {
      dialog
    }
  }
})
</script>

<style lang="scss" src="./ApplicationNavButtonGroup.component.scss"></style>
