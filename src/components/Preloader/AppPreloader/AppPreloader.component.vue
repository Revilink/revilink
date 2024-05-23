<template lang="pug">
.app-preloader(v-if="preloader.isLoading")
  .app-preloader__inner
    AppLogo.app-preloader__logo(:height="48")
    p.app-preloader__message {{ $t('general.loading') }} ...

  .app-preloader__bar
</template>

<script lang="ts">
import { defineComponent, useStore, computed, onMounted, nextTick } from '@nuxtjs/composition-api'
import { AppLogo } from '@/components/Logo'

export default defineComponent({
  components: {
    AppLogo
  },
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
