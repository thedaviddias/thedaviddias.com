/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
// const path = require('path')

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'mdx']
})

module.exports = nextConfig
