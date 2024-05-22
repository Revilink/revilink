<template lang="pug">
footer.app-footer
  .container.app-footer__inner
    .app-footer-copyright
      p.app-footer-copyright__description(v-html="`${$t('app.name')} - ${$t('app.description')}`")
      p.app-footer-copyright__description(v-html="`${$t('app.copyright')}`")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {}
})
</script>

<style lang="scss" src="./AppFooter.component.scss"></style>
