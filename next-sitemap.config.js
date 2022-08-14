/** @type {import('next-sitemap').IConfig} */

const commonOptions = {
  changefreq: 'weekly',
  priority: 0.4,
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
  siteUrl: 'https://thedaviddias.dev',
  generateRobotsTxt: true,
  exclude: ['/404', '/fr/404'],
  additionalPaths: async () => {
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

    result.push({
      loc: '/projects',
      ...commonOptions,
    })

    result.push({
      loc: '/bookmarks',
      ...commonOptions,
    })

    result.push({
      loc: '/tags',
      ...commonOptions,
    })

    result.push({
      loc: '/dashboard',
      ...commonOptions,
    })

    result.push({
      loc: '/uses',
      ...commonOptions,
    })

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
