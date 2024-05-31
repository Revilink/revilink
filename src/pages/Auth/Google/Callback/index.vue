<template lang="pug">
.page
  .container.text-center
    h5 {{ $t('general.redirecting') }} ...

    br
    br

    NuxtLink.mx-auto(size="small" :to="localePath('/')") {{ $t('error.redirecting') }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, onMounted } from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks'
const { getQuery, stringifyQuery } = require('ufo')

export default defineComponent({
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const router = useRouter()

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

      const redirectPath = context.$cookies.get('authNextRedirect')

      if (redirectPath) {
        await router.push(redirectPath)
      }

      if (context.$auth.user) {
        window.parent.postMessage({ type: 'google-callback-success' }, '*')

        if (window.opener) {
          window.opener.postMessage({ type: 'google-callback-success' }, '*')

          setTimeout(() => {
            window.close()
          }, 1000)
        } else {
          console.warn('window.opener is not available, cannot close the window.')
        }
      }
    })
  }
})
</script>
