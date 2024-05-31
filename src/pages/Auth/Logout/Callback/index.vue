<template lang="pug">
.page
  .container.text-center
    h5 {{ $t('general.loggingOut') }} ...

    br
    br

    NuxtLink.mx-auto(size="small" :to="localePath('/')" @click.prevent.capture="logout") {{ $t('general.logout') }}
</template>

<script lang="ts">
import { defineComponent, useContext, onMounted } from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks'

export default defineComponent({
  layout: 'Default/Default.layout',
  middleware: ['auth'],
  setup() {
    const context = useContext()
    const { logout } = useAuth()

    onMounted(async () => {
      await logout()
      await context.redirect(context.localePath('/'))
    })

    return {
      logout
    }
  }
})
</script>
