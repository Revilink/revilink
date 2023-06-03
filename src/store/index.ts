import { Context } from '@nuxt/types'

export const actions = {
  async nuxtClientInit({ _ }: unknown, { $auth, $api }: Context) {
    if ($auth.loggedIn) {
      const { data } = await $api.rest.auth.fetchMe()

      if (data) {
        $auth.setUser(data)
      }
    }

    // Watch Auth State
    $auth.$storage.watchState('loggedIn', async loggedIn => {
      if (loggedIn) {
        const { data } = await $api.rest.auth.fetchMe()

        if (data) {
          $auth.setUser(data)
        }
      }
    })
  }
}

export const strict = false
