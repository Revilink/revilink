import type { Context } from '@nuxt/types'

type ControlOldCookiesParamTypes = Pick<Context, '$cookies'>
type SetUserParamTypes = Pick<Context, '$auth' | '$api' | '$cookies'>

const controlOldCookies = ({ $cookies }: ControlOldCookiesParamTypes) => {
  const flagName = 'cookies_cleared'

  if (!$cookies.get(flagName)) {
    // Clear all cookies
    const allCookies = $cookies.getAll()

    for (const cookieName in allCookies) {
      $cookies.remove(cookieName)
    }

    // Clear localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.clear()
    }

    // Set flag to indicate cookies have been cleared
    $cookies.set(flagName, true, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })
  }
}

const setUser = async ({ $auth, $api, $cookies }: SetUserParamTypes) => {
  const logout = async () => {
    await $auth.setStrategy('local')
    await $auth.setUserToken('')
    await $auth.setUser(null)
    await $auth.logout()

    await $cookies.remove('google_auth_callback_params')
    await $cookies.remove('google_auth_access_token')
    await $cookies.remove('google_auth_jwt_token')
  }

  if ($auth.strategy.name === 'local' && $auth.loggedIn) {
    const { data, error } = await $api.rest.auth.fetchMe()

    if (data) {
      $auth.setUser(data)
    }

    if (error) {
      await logout()
    }
  }

  if ($cookies.get('auth._token.google')) {
    const { data, error } = await $api.rest.auth.fetchMe()

    if (data) {
      await $auth.setStrategy('google')
      await $auth.setUserToken(`${$cookies.get('auth._token.google')}`)
      await $auth.setUser(data)
    }

    if (error) {
      await logout()
    }
  }
}

export const actions = {
  async nuxtServerInit({ _ }: unknown, { $auth, $api, $cookies }: Context) {
    await controlOldCookies({ $cookies })
    await setUser({ $auth, $api, $cookies })

    // Watch Auth State
    $auth.$storage.watchState('loggedIn', async loggedIn => {
      if (loggedIn) {
        await setUser({ $auth, $api, $cookies })
      }
    })
  },

  async nuxtClientInit({ _ }: unknown, { $auth, $api, $cookies }: Context) {
    await controlOldCookies({ $cookies })
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
