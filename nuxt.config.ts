// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: ['@nuxt/fonts', '@nuxt/ui', '@vueuse/nuxt', '@nuxtjs/strapi', '@nuxt/image', '@nuxt/icon'],

  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green']
  },

  colorMode: {
    disableTransition: true
  },
  strapi: {
    url: process.env.STRAPI_URL || 'https://strapi-dash.mtdjari.com',
    prefix: '/api',
    admin: '/admin',
    version: 'v5',
    // cookie: {},
    // cookieName: 'strapi_jwt'
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true }
  },

  devtools: {
    enabled: true
  },

  typescript: {
    strict: false
  },

  future: {
    compatibilityVersion: 4
  },

  // eslint: {
  //   config: {
  //     stylistic: {
  //       commaDangle: 'never',
  //       braceStyle: '1tbs'
  //     }
  //   }
  // },

  compatibilityDate: '2024-07-11'
})