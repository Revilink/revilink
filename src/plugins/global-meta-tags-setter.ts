import { Context } from '@nuxt/types'

export default ({ app, i18n }: Context) => {
  const head: any = app.head

  head.htmlAttrs.lang = i18n.locale
}
