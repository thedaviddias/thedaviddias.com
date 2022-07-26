/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
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
