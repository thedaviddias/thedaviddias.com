/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  poweredByHeader: false,
  images: {
    domains: ['webmention.io', 'i.gr-assets.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  async redirects() {
    return [
      {
        source: '/blog/:path*',
        destination: '/articles/:path*',
        permanent: true,
      },
      {
        source: '/authors/@david-dias',
        destination: '/about',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    })
    return config
  },
})

module.exports = nextConfig
