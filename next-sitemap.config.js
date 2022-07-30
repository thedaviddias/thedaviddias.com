/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.SITE_URL || 'https://thedaviddias.dev',
  generateRobotsTxt: true,
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

module.exports = config
