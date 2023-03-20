import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-srcdir
  srcDir: '',

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  /*
   ** Nuxt env configuration
   ** See https://nuxtjs.org/docs/configuration-glossary/configuration-env
   */
  env: {},

  /*
   ** Nuxt runtime configuration
   ** See https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config
   */
  publicRuntimeConfig: {
    API: 'http://localhost:3004'
  },

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
    // https://vuesax.com
    {
      src: '@/plugins/vuesax.ts',
      ssr: true
    },
    // https://docs.iconify.design/icon-components/vue
    {
      src: '@/plugins/iconify.ts',
      ssr: false
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
        url: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap',
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
            file: 'en.ts'
          },
          {
            name: 'Turkish',
            title: 'Türkçe',
            code: 'tr',
            iso: 'tr-TR',
            file: 'tr.ts'
          }
        ],
        langDir: 'locales/',
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false,
        parsePages: false,
        pages: {
          'Reviews/index': {
            en: '/reviews',
            tr: '/incelemeler'
          },
          'Comment/_id': {
            en: '/comment/:id',
            tr: '/yorum/:id'
          }
        }
      }
    ]
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
    }
  ],

  /*
   ** Server configuration
   ** See https://nuxtjs.org/api/configuration-server
   */
  server: {
    host: '0.0.0.0', // default: localhost,
    timing: false,
    port: 3000
  }
}

export default config
