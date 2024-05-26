import { NuxtConfig } from '@nuxt/types'

const { API } = require('../system/constants')

const config: NuxtConfig = {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-srcdir
  srcDir: '',

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  /*
   ** Server side rendering
   ** See https://v2.nuxt.com/docs/configuration-glossary/configuration-ssr
   */
  ssr: true,

  /*
   ** Nuxt env configuration
   ** See https://nuxtjs.org/docs/configuration-glossary/configuration-env
   */
  env: {
    API: process.env.API || '',
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID || '',
    BUCKET_URL: process.env.BUCKET_URL || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
  },

  /*
   ** Nuxt runtime configuration
   ** See https://v2.nuxt.com/docs/directory-structure/nuxt-config#runtimeconfig
   */
  publicRuntimeConfig: {
    API: process.env.API
  },

  privateRuntimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  },

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    titleTemplate: titleChunk => {
      return titleChunk
        ? `${titleChunk} - Revilink - Comment on any link on the internet`
        : 'Revilink - Comment on any link on the internet'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index,follow'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Comment on any link on the internet'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Revilink ― Comment on any link on the internet'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Revilink ― Comment on any link on the internet'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://revilink.io'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/meta/preview/og-main.png'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Revilink ― Comment on any link on the internet'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'Revilink ― Comment on any link on the internet'
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: 'https://revilink.io'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: '/meta/preview/og-main.png'
      },
      {
        hid: 'Publisher',
        property: 'Publisher',
        content: 'selimdoyranli'
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#fff'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      { name: 'Rating', content: 'General' },
      { name: 'Distribution', content: 'Global' },
      { name: 'Copyright', content: 'Revilink' },
      { itemprop: 'copyrightYear', content: new Date().getFullYear().toString() }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/meta/icon/favicon.ico' },
      { rel: 'dns-prefetch', href: '//backend.revilink.io' },
      { rel: 'manifest', href: '/manifest.json' }
    ]
  },

  /*
   ** Global Styles (Do not import actual styles)
   ** https://www.npmjs.com/package/@nuxtjs/style-resources
   */
  styleResources: {
    scss: [
      /*
       * Vendor
       */
      // > Bootstrap Vendor
      'bootstrap/scss/_functions.scss',
      'bootstrap/scss/_variables.scss',
      'bootstrap/scss/_mixins.scss',

      /*
       * Overrides (This overrides not includes actual styles. | variables, mixins etc.)
       */
      // > Bootstrap Overrides
      '@/assets/style/scss/overrides/bootstrap/_grid.override.scss',
      '@/assets/style/scss/overrides/bootstrap/_spacing.override.scss',

      /*
       * Plugins
       */
      // --

      /*
       * Functions
       */
      '@/assets/style/scss/functions/_center.scss',
      '@/assets/style/scss/functions/_triangle.scss',

      /*
       * Variables
       */
      // --

      /*
       * Mixins
       */
      '@/assets/style/scss/mixins/_font.scss',
      '@/assets/style/scss/mixins/_gradient.scss'
    ]
  },

  /*
   ** Global Styles (Actual styles)
   */
  css: [
    // Actual styles entry point (as import management)
    '~/assets/style/scss/app.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: '@/services/api.injector.ts',
      ssr: true
    },
    {
      src: '@/services/rest/core/app-axios.ts',
      ssr: true
    },
    {
      src: '@/services/rest/core/api-register.ts',
      ssr: true
    },
    {
      src: '@/plugins/dynamic-head.ts',
      ssr: true
    },
    {
      src: '@/plugins/encode-decode.ts',
      ssr: true
    },
    {
      src: '@/plugins/auth-control.ts',
      ssr: false
    },
    // https://vuesax.com
    {
      src: '@/plugins/vuesax.ts',
      ssr: true
    },
    // https://docs.iconify.design/icon-components/vue
    {
      src: '@/plugins/iconify.ts',
      ssr: false
    },
    // https://vue-timeago.egoist.sh
    {
      src: '@/plugins/vue-timeago.ts',
      ssr: false
    },
    // https://github.com/zhanziyang/vue-croppa
    {
      src: '@/plugins/vue-croppa.ts',
      ssr: true
    }
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  // e.g. components: [{ path: '@/components', pathPrefix: false }]
  components: false,

  /*
   ** Router configuration
   ** https://nuxtjs.org/docs/configuration-glossary/configuration-router
   */
  router: {
    middleware: ['vs-tooltip-destroyer.middleware'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve('@/pages/Home/-index.vue')
      })
    }
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // https://typescript.nuxtjs.org
    '@nuxt/typescript-build',
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/nuxt-community/eslint-module
    [
      '@nuxtjs/eslint-module',
      {
        // eslint module options
      }
    ],
    // https://github.com/nuxt-community/stylelint-module
    [
      '@nuxtjs/stylelint-module',
      {
        files: ['./{assets/style,components,layouts,pages}/**/*.{css,sass,scss,less,stylus,vue}']
      }
    ],
    // https://www.npmjs.com/package/nuxt-font-loader
    [
      'nuxt-font-loader',
      {
        url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap',
        prefetch: true,
        preconnect: true
      }
    ]
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://axios.nuxtjs.org
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // https://auth.nuxtjs.org
    [
      '@nuxtjs/auth-next',
      {
        redirect: {
          login: '/login',
          logout: null
        },
        strategies: {
          local: {
            token: {
              property: 'jwt',
              global: true
            },
            endpoints: {
              login: { url: `${process.env.API || API}/auth/local`, method: 'post' },
              logout: false,
              user: false
            },
            user: {
              property: '', // the response itself
              autoFetch: false // User will fetch by api function in store/index
            }
          },
          google: {
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            codeChallengeMethod: '',
            responseType: 'code'
          }
        },
        plugins: ['@/plugins/auth-lang-redirect.ts']
      }
    ],
    // https://i18n.nuxtjs.org
    [
      '@nuxtjs/i18n',
      {
        lazy: true,
        locales: [
          {
            name: 'English',
            title: 'English',
            code: 'en',
            iso: 'en-US',
            dir: 'ltr',
            icon: 'circle-flags:us',
            file: 'en.ts'
          },
          {
            name: 'Turkish',
            title: 'Türkçe',
            code: 'tr',
            iso: 'tr-TR',
            dir: 'ltr',
            icon: 'circle-flags:tr',
            file: 'tr.ts'
          }
        ],
        langDir: 'locales/',
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false,
        parsePages: false,
        pages: {
          'Profile/index': {
            en: '/profile',
            tr: '/profil'
          },
          'Auth/Register/index': {
            en: '/register',
            tr: '/kayit'
          },
          'Auth/Login/index': {
            en: '/login',
            tr: '/giris'
          },
          'Auth/ForgotPassword/index': {
            en: '/forgot-password',
            tr: '/parolami-unuttum'
          },
          'Auth/ForgotPassword/Sent/index': {
            en: '/forgot-password/sent',
            tr: '/parolami-unuttum/gonderildi'
          },
          'Auth/ForgotPassword/Reset/index': {
            en: '/forgot-password/reset',
            tr: '/parolami-unuttum/sifirla'
          },
          'Auth/ForgotPassword/Success/index': {
            en: '/forgot-password/success',
            tr: '/parolami-unuttum/basarili'
          },
          'Auth/Logout/Callback/index': {
            en: '/logout/callback',
            tr: '/cikis/cikis-yapiliyor'
          },
          'Reviews/index': {
            en: '/reviews',
            tr: '/incelemeler'
          },
          'Comment/index': {
            en: '/comment',
            tr: '/yorum'
          },
          'Settings/Profile/index': {
            en: '/settings/profile',
            tr: '/ayarlar/profil'
          },
          'Settings/Account/index': {
            en: '/settings/account',
            tr: '/ayarlar/hesap'
          },
          'cms/page/_slug': {
            en: '/cms/page/:slug',
            tr: '/cms/sayfa/:slug'
          }
        }
      }
    ],
    // https://www.npmjs.com/package/@nuxt/content
    [
      '@nuxt/content',
      {
        liveEdit: false
      }
    ],
    // https://www.npmjs.com/package/nuxt-client-init-module
    'nuxt-client-init-module'
  ],

  /*
   ** Typescript configuration
   ** See https://typescript.nuxtjs.org/guide/lint#runtime-lint
   */
  typescript: {
    typeCheck: {
      async: false,
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build
   */
  build: {
    extractCSS: process.env.NODE_ENV === 'production'
  },

  /*
   ** Server middleware configuration
   ** See https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware/
   */
  serverMiddleware: [
    {
      path: '/site-robots-checker',
      handler: '@/server/middleware/site-robots-checker.ts'
    },
    {
      path: '/site-scraper',
      handler: '@/server/middleware/site-scraper.ts'
    },
    {
      path: '/site-ai-summary',
      handler: '@/server/middleware/site-ai-summary.ts'
    }
  ],

  /*
   ** Server configuration
   ** See https://nuxtjs.org/api/configuration-server
   */
  server: {
    host: '0.0.0.0', // default: localhost,
    timing: false,
    port: process.env.NUXT_PORT || 3000
  }
}

export default config
