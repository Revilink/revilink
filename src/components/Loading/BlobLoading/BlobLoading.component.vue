<template lang="pug">
.blob-loading(:style="`--width: ${size}px; --height: ${size}px`")
  .blob
    span.blob-loading__title
      template(v-if="title") {{ title }}
      template(v-else) {{ $t('general.loading') }}
  .blob1
  .blob2
  .blob3
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    size: {
      type: [Number, String],
      required: false,
      default: 96
    },
    title: {
      type: String,
      required: false,
      default: null
    }
  },
  setup() {}
})
</script>

<style lang="scss" src="./BlobLoading.component.scss"></style>
