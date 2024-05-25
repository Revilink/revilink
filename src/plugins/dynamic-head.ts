import type { Context, NuxtAppOptions } from '@nuxt/types'
import { NuxtI18nInstance } from '@nuxtjs/i18n'

interface ExtendedAppTypes extends NuxtAppOptions {
  i18n: NuxtI18nInstance
  head: any
}

export default ({ app }: Context) => {
  const extendedApp = app as ExtendedAppTypes

  const headFile = require(`../../system/head/${extendedApp.i18n.locale || 'en'}.ts`)

  if (extendedApp.head) {
    extendedApp.head.htmlAttrs.lang = extendedApp.i18n.locale
    extendedApp.head.htmlAttrs.dir = extendedApp.i18n.localeProperties.dir

    const setTitleTemplate = () => {
      extendedApp.head.titleTemplate = headFile.titleTemplate
    }

    const setTitle = () => {
      extendedApp.head.title = headFile.title
    }

    const setMeta = () => {
      extendedApp.head.meta = headFile.meta
    }

    setTitleTemplate()
    setTitle()
    setMeta()
  }
}
