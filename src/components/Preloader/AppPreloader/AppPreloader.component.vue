<template lang="pug">
.app-preloader(v-if="preloader.isLoading")
  .app-preloader__inner
    span.app-preloader__title Loading...
</template>

<script lang="ts">
import { defineComponent, useStore, computed, onMounted, nextTick } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const preloader = computed(() => store.getters['preloader/preloader'])

    onMounted(async () => {
      await nextTick()

      store.commit('preloader/HIDE')
    })

    return {
      preloader
    }
  }
})
</script>

<style lang="scss" src="./AppPreloader.component.scss"></style>
