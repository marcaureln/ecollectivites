export default {
  // Telemetry: https://github.com/nuxt/telemetry
  telemetry: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // No server-side rendering (only client-side navigation)
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ecollectivites',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js', body: true }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE_URL || '/api',
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
      post: {
        'Content-Type': 'application/json; charset=utf-8;',
      },
    },
  },

  googleFonts: {
    families: {
      Roboto: [300, 400, 700],
      'Barlow+Condensed': [700],
    },
    download: true,
    inject: true,
  },

  styleResources: {
    scss: ['./assets/css/variables.scss', './assets/css/mixins.scss'],
  },

  // Toast plugin configuration: https://github.com/shakee93/vue-toasted
  toast: {
    position: 'bottom-center',
    duration: 1000,
    keepOnHove: true,
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: '0.0.0.0',
  },
};
