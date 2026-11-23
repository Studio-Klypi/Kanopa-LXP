// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['../../packages/design'],
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',

  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'fr',
        file: 'fr.json',
      },
    ],
  },
});
