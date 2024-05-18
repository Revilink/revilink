<template lang="pug">
.page
  span Redirecting ...
</template>

<script lang="ts">
import { defineComponent, useContext, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const context = useContext()

    const setUser = async () => {
      const { data, error }: any = await context.$api.rest.auth.fetchGoogleUser(window.location.search.toString())

      console.log(data, error)

      if (data) {
        await context.$auth.setStrategy('google')
        await context.$auth.setUserToken(window.location.search.split('access_token=')[1].toString())
        await context.$auth.setUser(data.user)
      }
    }

    onMounted(async () => {
      await setUser()
    })
  }
})
</script>
