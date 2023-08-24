<template lang="pug">
.basic-state
  .basic-state__head(v-if="$slots.head")
    slot(name="head")
  .basic-state__body(v-if="title || description")
    h3.basic-state__title {{ title }}
    p.basic-state__description {{ description }}
  .basic-state__footer(v-if="$slots.footer")
    slot(name="footer")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    description: {
      type: String,
      required: false,
      default: null
    }
  },
  setup() {}
})
</script>

<style lang="scss" src="./BasicState.component.scss"></style>
