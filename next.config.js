/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
const path = require('path')

module.exports = nextTranslate({
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.optimization.providedExports = true

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    }

    return config
  },
  images: {
    domains: ['img.youtube.com', 'media.giphy.com'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
})
