module.exports = {
  experimental: {
    optimizeFonts: true,
  },
  i18n: {
    locales: ['ja-JP'],
    defaultLocale: 'ja-JP',
    domains: [
      {
        domain: 'dev.mondai.page',
        defaultLocale: 'ja-JP',
      },
    ],
  },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
