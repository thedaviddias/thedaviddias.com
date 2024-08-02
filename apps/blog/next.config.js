/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const { withPlausibleProxy } = require('next-plausible')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const path = require('path')

const plausiblePlugin = withPlausibleProxy

const plugins = [plausiblePlugin]

const nextConfig = withPlugins([plugins, nextTranslate], {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  poweredByHeader: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'webmention.io',
      'i.gr-assets.com',
      'i.ytimg.com',
      'github.com',
      'substack-post-media.s3.amazonaws.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
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
  // Ref: https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/articles/what-i-learned-about-side-project-presenting-meetups-europe',
        destination: '/articles/learned-presenting-side-project-europe',
        permanent: true,
      },
      {
        source: '/notes/methodology-principle-user-first',
        destination: '/notes/philosophy-approach-user-first',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/tag/:tag*',
        destination: '/tags/:tag*',
        permanent: true,
      },
    ]
  },
})

const moduleExports = nextConfig

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports
