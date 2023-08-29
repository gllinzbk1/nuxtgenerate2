// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  ssr: true,  //不为true不会触发api请求
  experimental:{payloadExtraction:false},
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'facebook-domain-verification', content: 'z7pujkh9nnmwrhgrofcm6p308glvub' },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        { name: 'X-UA-Compatible', content: 'IE=edge,Chrome=1' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      ],
    },
  },
  modules: [
    // pinia plugin
    '@nuxtjs/harlem',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@pinia/nuxt',
    '@nuxtjs/harlem',
    'nuxt-lodash',
    '@nuxtjs/tailwindcss',
    //'@nuxt-alt/proxy',
    'nuxt-proxy-request',
    '@tailwindcss/forms',
    'blueblocksui-banner/nuxt',
    'blueblocksui-breadcrumb/nuxt',
    'blueblocksui-button/nuxt',
    'blueblocksui-card/nuxt',
    'blueblocksui-carousel/nuxt',
    'blueblocksui-category-filters/nuxt',
    'blueblocksui-comment/nuxt',
    'blueblocksui-dialog/nuxt',
    'blueblocksui-footer/nuxt',
    'blueblocksui-header/nuxt',
    'blueblocksui-headings/nuxt',
    'blueblocksui-pagination/nuxt',
    'blueblocksui-tabs/nuxt',
    'blueblocksui-layouts/nuxt',
    'blueblocksui-comment-list/nuxt',
    'blueblocksui-paragraph/nuxt',
    'blueblocksui-product-detail/nuxt',
    'blueblocksui-tag/nuxt',
    'blueblocksui-suspension/nuxt',
    'blueblocksui-mobile-footer/nuxt',
    'blueblocksui-mobile-header/nuxt'

  ],
  //plugins:['~/plugins/globalpinia'],
  runtimeConfig: {
    public: {},
    proxy: {
      options: [
        {
          target: 'http://f.lgl.lb.in:8080/vueapi',
          pathFilter: ['/api/**'],
          pathRewrite: {
            '^/api': ''
          }
        }
      ]
    }
    // proxy:{
    //   proxies:{
    //     '^/api/.*': {
    //       target: 'http://f.lgl.lb.in:8080/vueapi/',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    //   }
    // }

  },
  lodash: {
    prefix: "use",
    prefixSkip: ["is"],
    upperAfterPrefix: true,
    exclude: [""],
    alias: [
      ["camelCase", "stringToCamelCase"], // => stringToCamelCase
      ["kebabCase", "stringToKebab"], // => stringToKebab
      ["isDate", "isLodashDate"], // => _isLodashDate
    ],
  },

  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs', 'mapStores', 'getActivePinia'],
  },
  // routeRules:{
  //   '/shop/carbon-accessories/**': { cors: true },
  //   '/shop/carbon-BMX-bike/**': { cors: true },
  //   '/shop/carbon-fat-bike/**': { cors: true },
  //   '/shop/carbon-mountain-bike/**': { cors: true },
  //   '/shop/carbon-road-bike/**': { cors: true },
  //   '/shop/carbon-road-gravel-cx-disc-bike/**': { cors: true },
  //   '/shop/carbon-tri-time-trial-track-bike/**': { cors: true },


  //  },
  // nitro: {
  //   logLevel:1,
  //   errorHandler: "~/error"
  //   // rollupConfig: {
  //   //   // external: ['ali-oss'],
  //   //   include: 'node_modules/blueblocksui**',
  //   // },
  // },
  nitro: {
    logLevel: 4,
    //dev:false,
    prerender: {
      //baseURL: "http://localhost:3000",
      crawlLinks: true,
     // routes: ['/', 'sitemap.xml'],
      // ignore: ['/tak', '/konfiguration', '/checkout'],
      failOnError:false
    },
  },
  //站点地图的配置
  sitemap: {
    siteUrl: 'http://192.168.130.139:3000',
  },

  //如果出现这个情况，你可以在nuxt配置中的build.transpile选择中添加你依赖的库，这个就告诉nuxt不要尝试导入这些库。
  build: {
    transpile: [/blueblocksui/]  //是一个正则

    // process.env.NODE_ENV !== "production"
    //   ? [
    //       "blueblocksui-footer",

    //     ]
    //   : [],
  },
  // localization - i18n config  ,nuxt-awesome-starter
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en', 'id', 'ja', 'ko'],
    },
  },
})
