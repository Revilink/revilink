import type { Context } from '@nuxt/types'

export default ({ app, store }: Context) => {
  const clickHandler = (event: MouseEvent) => {
    const targetElement = event.target as Element
    const target = targetElement ? targetElement.closest('[auth-control]') : null

    if (target) {
      if (!app.$auth.user) {
        store.commit('auth-control/OPEN_LOGIN_DIALOG')

        event.preventDefault()
        event.stopPropagation()

        return false
      }
    }
  }

  const addClickListener = () => {
    window.removeEventListener('click', clickHandler, true)
    window.addEventListener('click', clickHandler, true)
  }

  if (process.client) {
    addClickListener()

    app.router?.afterEach(() => {
      addClickListener()
      store.commit('auth-control/CLOSE_LOGIN_DIALOG')
    })
  }
}
