<template lang="pug">
.page
  .container.text-center
    h5 {{ $t('general.redirecting') }} ...

    br
    br

    NuxtLink.mx-auto(size="small" :to="localePath('/')") {{ $t('error.redirecting') }}
</template>

<script lang="ts">
import { defineComponent, useContext, onMounted } from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks'
const { getQuery, stringifyQuery } = require('ufo')

export default defineComponent({
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const { setGoogleUser } = useAuth()

    const fetchUser = async () => {
      const callbackParams = getQuery(window.location.href)

      const { data } = await context.$api.rest.auth.fetchGoogleUser(stringifyQuery(callbackParams))

      return {
        data
      }
    }

    const setUser = async () => {
      const callbackParams = getQuery(window.location.href)

      const { data } = await fetchUser()

      if (data) {
        await setGoogleUser({ callbackParams, googleResponse: data })
      }
    }

    onMounted(async () => {
      await Promise.allSettled([fetchUser(), setUser()])
    })
  }
})
</script>