<template lang="pug">
NuxtLink.app-logo(v-if="link" :to="localePath('/')" title="Revilink")
  img.app-logo__image(:src="logoImage" alt="Revilink" :width="width" :height="height")
.app-logo(v-else)
  img.app-logo__image(:src="logoImage" alt="Revilink" :width="width" :height="height")
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    link: {
      type: String,
      required: false,
      default: '/'
    },
    full: {
      type: Boolean,
      required: false,
      default: true
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 512
    }
  },
  setup(props) {
    const logoImage = computed(() => {
      if (props.full) {
        return `/media/core/logo/revilink_logo_512_full.png`
      } else {
        return `/media/core/logo/revilink_logo_512.png`
      }
    })

    return {
      logoImage
    }
  }
})
</script>

<style lang="scss" src="./AppLogo.component.scss"></style>
