/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
const { withSentryConfig } = require('@sentry/nextjs');

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

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  dryRun: process.env.VERCEL_ENV !== "production"
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
