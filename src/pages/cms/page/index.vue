<template lang="pug">
.page
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const context = useContext()

    context.redirect(context.localePath(`/cms/page/${context.i18n.t('cms.about.route')}`))
  }
})
</script>
