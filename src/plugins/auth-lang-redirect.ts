import { Context } from '@nuxt/types'

export default ({ app, $auth }: Context) => {
  $auth.onRedirect(to => {
    return app.localePath(to)
  })
}
