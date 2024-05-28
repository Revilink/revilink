<template lang="pug">
client-only
  vs-dialog.cookie-dialog(v-model="isVisible" not-close)
    strong.cookie-dialog__title {{ $t('cookie.title') }}
    p.cookie-dialog__description(v-html="$t('cookie.description')")

    vs-button.cookie-dialog__acceptButton(size="small" @click="acceptCookies") {{ $t('general.iUnderstand') }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isAcceptedCookies = ref(false)
    const isVisible = ref(true)

    const acceptCookies = () => {
      window.localStorage.setItem('is-accepted-cookies', 'true')
      isAcceptedCookies.value = true
      isVisible.value = false
    }

    onMounted(() => {
      if (window.localStorage.getItem('is-accepted-cookies')) {
        isAcceptedCookies.value = true
        isVisible.value = false
      }
    })

    return {
      isAcceptedCookies,
      isVisible,
      acceptCookies
    }
  }
})
</script>

<style lang="scss" src="./CookieDialog.component.scss"></style>
