/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const { withSentryConfig } = require('@sentry/nextjs')
const { withPlausibleProxy } = require('next-plausible')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const plausiblePlugin = withPlausibleProxy
const bundleAnalyser = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const plugins = [plausiblePlugin, bundleAnalyser]

const nextConfig = withPlugins([plugins, nextTranslate], {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  poweredByHeader: false,
  images: {
    domains: ['images.unsplash.com', 'webmention.io', 'i.gr-assets.com', 'i.ytimg.com'],
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
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
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

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  hideSourceMaps: true,
  silent: true, // Suppresses all logs
  dryRun: process.env.VERCEL_ENV !== 'production',
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
