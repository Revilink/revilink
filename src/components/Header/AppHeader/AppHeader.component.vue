<template lang="pug">
header.app-header
  .app-header__inner.container
    AppLogo(v-show="false" :height="34")
    ApplicationNavButtonGroup.ms-auto
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppLogo } from '@/components/Logo'
import { ApplicationNavButtonGroup } from '@/components/ButtonGroup'

export default defineComponent({
  components: {
    AppLogo,
    ApplicationNavButtonGroup
  },
  setup() {}
})
</script>

<style lang="scss" src="./AppHeader.component.scss"></style>
