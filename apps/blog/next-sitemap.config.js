/** @type {import('next-sitemap').IConfig} */

const { execSync } = require('child_process')
const path = require('path')

const hasChanges = () => {
  const changes = execSync('git diff --name-only').toString()

  return changes.split('\n').some((file) => file.startsWith('content/'))
}

const commonOptions = (config) => ({
  lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
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
})

const config = {
  siteUrl: 'https://thedaviddias.dev',
  generateRobotsTxt: true,
  exclude: ['/404', '/fr/404'],
  additionalPaths: async (config) => {
    const result = []

    result.push({
      loc: '/',
      ...commonOptions(config),
    })

    result.push({
      loc: '/about',
      changefreq: 'weekly',
      ...commonOptions(config),
    })

    result.push({
      loc: '/articles',
      ...commonOptions(config),
    })

    result.push({
      loc: '/notes',
      ...commonOptions(config),
    })

    result.push({
      loc: '/projects',
      changefreq: 'weekly',
      ...commonOptions(config),
    })

    result.push({
      loc: '/tags',
      changefreq: 'weekly',
      ...commonOptions(config),
    })

    result.push({
      loc: '/dashboard',
      changefreq: 'weekly',
      ...commonOptions(config),
    })

    result.push({
      loc: '/supporters',
      changefreq: 'weekly',
      ...commonOptions(config),
    })

    result.push({
      loc: '/uses',
      changefreq: 'monthly',
      ...commonOptions(config),
    })

    return result
  },
}

module.exports = config
