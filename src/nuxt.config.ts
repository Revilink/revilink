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
      // --

      /*
       * Overrides (This overrides not includes actual styles. | variables, mixins etc.)
       */
      // > --

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
  plugins: [],

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
    ]
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [],

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
