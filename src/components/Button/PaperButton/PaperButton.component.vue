<template lang="pug">
component.paper-button(v-bind="$attrs" :is="tag" :role="'button'" :style="{ width: `${width}px`, height: `${height}px` }")
  slot
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tag: {
      type: String,
      required: false,
      default: 'button'
    },
    width: {
      type: Number,
      required: false,
      default: 35
    },
    height: {
      type: Number,
      required: false,
      default: 35
    }
  },
  setup() {}
})
</script>

<style lang="scss" src="./PaperButton.component.scss" />
