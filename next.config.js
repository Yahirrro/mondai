module.exports = {
  images: {
    domains: ['api.qrserver.com'],
  },
  experimental: {
    optimizeFonts: true,
  },
  i18n: {
    locales: ['ja-JP'],
    defaultLocale: 'ja-JP',
    domains: [
      {
        domain: 'mondai.page',
        defaultLocale: 'ja-JP',
      },
    ],
  },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
