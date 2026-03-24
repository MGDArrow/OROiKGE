// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server',
  },
  css: [
    './assets/reset.css',
    './assets/variables.css',
    './assets/styles.css',
    './assets/competition.css',
  ],
  app: {
    head: {
      title: 'Отдел Религиозного Образования и Катехизации Горловской Епархии',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=2',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        {
          name: 'description',
          content:
            'Официальный сайт Отдела Религиозного Образования и Катехизации Горловской Епархии',
        },
        { name: 'keywords', content: 'ОРОиК ГЕ' },
        { name: 'theme-color', content: '#2b2d66' },
        { name: 'author', content: 'MGDArrow' },
        { name: 'creator', content: 'MGDArrow' },
        { name: 'apple-mobile-web-app-title', content: 'ОРОиК ГЕ' },
      ],
      // link: [
      //   {
      //     rel: 'icon',
      //     type: 'image/png',
      //     href: '/favicon-96x96.png',
      //     sizes: '96x96',
      //   },
      //   { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      //   { rel: 'shortcut icon', href: '/favicon.ico' },
      //   {
      //     rel: 'apple-touch-icon',
      //     href: '/apple-touch-icon.png',
      //     sizes: '180x180',
      //   },
      //   { rel: 'manifest', href: '/site.webmanifest' },
      // ],
    },
  },
});
