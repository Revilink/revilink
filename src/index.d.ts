import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Auth } from '@nuxtjs/auth-next'
import { IVueI18nNuxt } from '@nuxtjs/i18n'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
    $vs: any
    $auth: Auth
    i18n: IVueI18nNuxt
    $encodeBase64: any
    $isBase64: any
    $decodeBase64: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $axios: NuxtAxiosInstance
    $vs: any
    $auth: Auth
    i18n: IVueI18nNuxt
    $encodeBase64: any
    $isBase64: any
    $decodeBase64: any
  }

  interface Context {
    $axios: NuxtAxiosInstance
    $vs: any
    $auth: Auth
    i18n: IVueI18nNuxt
    $encodeBase64: any
    $isBase64: any
    $decodeBase64: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $axios: NuxtAxiosInstance
    $vs: any
    $auth: Auth
  }
}
