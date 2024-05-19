import type { Context } from '@nuxt/types'

type SetUserParamTypes = Pick<Context, '$auth' | '$api' | '$cookies'>

const setUser = async ({ $auth, $api, $cookies }: SetUserParamTypes) => {
  if ($auth.loggedIn && $auth.strategy.name === 'local') {
    const { data } = await $api.rest.auth.fetchMe()

    if (data) {
      $auth.setUser(data)
    }
  }

  if ($cookies.get('google_auth_jwt_token') && $auth.strategy.name === 'google') {
    const { data, error } = await $api.rest.auth.fetchMe()

    if (data) {
      await $auth.setStrategy('google')
      await $auth.setUserToken(`${$cookies.get('google_auth_jwt_token')}`)
      await $auth.setUser(data)
    }

    if (error) {
      throw new Error(error.message)
    }
  }
}

export const actions = {
  async nuxtServerInit({ _ }: unknown, { $auth, $api, $cookies }: Context) {
    await setUser({ $auth, $api, $cookies })

    // Watch Auth State
    $auth.$storage.watchState('loggedIn', async loggedIn => {
      if (loggedIn) {
        await setUser({ $auth, $api, $cookies })
      }
    })
  },

  async nuxtClientInit({ _ }: unknown, { $auth, $api, $cookies }: Context) {
    await setUser({ $auth, $api, $cookies })

    // Watch Auth State
    $auth.$storage.watchState('loggedIn', async loggedIn => {
      if (loggedIn) {
        await setUser({ $auth, $api, $cookies })
      }
    })
  }
}

export const strict = false
