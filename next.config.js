/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
// const path = require('path')

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  // webpack: (config) => {
  //   config.plugins = config.plugins || []

  //   config.optimization.providedExports = true

  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@/': path.resolve(__dirname, './src'),
  //   }

  //   return config
  // },
})

module.exports = nextConfig
