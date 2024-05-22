<template lang="pug">
client-only
  .app-loading(v-bind="$attrs" ref="rootRef")
    .app-loading__loading(:style="[{ '--width': `${size}px`, '--height': `${size}px` }]")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from '@nuxtjs/composition-api'
import { Ref } from 'vue'

export default defineComponent({
  props: {
    size: {
      type: [Number, String],
      required: false,
      default: 24
    },
    title: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const baseClassName = 'app-loading'

    const rootRef: Ref<HTMLElement | null> = ref(null)

    onMounted(async () => {
      await nextTick()

      window.$nuxt.$vs.loading({
        target: rootRef.value?.querySelector(`.${baseClassName}__loading`),
        text: props.title
      })
    })

    return {
      rootRef
    }
  }
})
</script>

<style lang="scss" src="./AppLoading.component.scss"></style>
