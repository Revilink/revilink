<template lang="pug">
.application-nav-button-group
  vs-tooltip.application-nav-button-group__item(bottom)
    PaperButton(:width="42" :height="42")
      AppIcon(name="majesticons:applications-line" :width="26" :height="26")
    template(#tooltip)
      span {{ $t('general.application') }}

  vs-tooltip.application-nav-button-group__item(bottom)
    PaperButton(:width="42" :height="42")
      AppIcon(name="ri:user-shared-line" :width="26" :height="26")
    template(#tooltip)
      span {{ $t('general.login') }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    PaperButton,
    AppIcon
  },
  setup() {}
})
</script>

<style lang="scss" src="./ApplicationNavButtonGroup.component.scss"></style>
