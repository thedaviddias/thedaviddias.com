/** @type {import('next-sitemap').IConfig} */

const commonOptions = {
  changefreq: 'daily',
  priority: 0.7,
  alternateRefs: [
    {
      href: 'https://thedaviddias.dev',
      hreflang: 'en',
    },
    {
      href: 'https://thedaviddias.dev/fr',
      hreflang: 'fr',
    },
  ],
}

const config = {
  siteUrl: process.env.SITE_URL || 'https://thedaviddias.dev',
  generateRobotsTxt: true,
  exclude: ['/404', '/fr/404'],
  additionalPaths: async (config) => {
    const result = []

    result.push({
      loc: '/',
      ...commonOptions,
    })

    result.push({
      loc: '/about',
      ...commonOptions,
    })

    result.push({
      loc: '/articles',
      ...commonOptions,
    })

    result.push({
      loc: '/notes',
      ...commonOptions,
    })

    // using transformation from the current configuration
    // result.push(await config.transform(config, '/about'))
    // result.push(await config.transform(config, '/articles'))
    // result.push(await config.transform(config, '/notes'))

    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}

module.exports = config
