import { NextSeoProps } from 'next-seo'

export const baseUrl = 'https://thedaviddias.dev' || process.env.VERCEL_URL
export const baseEmail = 'hello@thedaviddias.com'

const title = 'The David Dias | Front-End Developer, podcaster & content creator'
const description = `Hey, I'm David Dias! Software Engineer based in Toronto / Canada. I love talking about code, technology, expatriation and life.`

export const defaultSEO: NextSeoProps = {
  title,
  description,
  titleTemplate: '%s | The David Dias',
  defaultTitle: 'The David Dias',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title,
    description,
    site_name: `${title}`,
    profile: {
      firstName: 'David',
      lastName: 'Dias',
      gender: 'male',
    },
    images: [
      {
        url: `${baseUrl}/og/default.png`,
        alt: 'The David Dias',
      },
    ],
  },
  twitter: {
    handle: '@thedaviddias',
    site: '@thedaviddias',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'application-name',
      content: 'The David Dias',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-config',
      content: `/favicons/browserconfig.xml`,
    },
  ],
  additionalLinkTags: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: '/rss/feed.xml',
    },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: '/rss/fr/feed.xml',
    },
    {
      rel: 'icon',
      href: `/favicon.ico`,
    },
    {
      rel: 'apple-touch-icon',
      href: `/favicons/apple-touch-icon.png`,
      sizes: '76x76',
    },
    {
      rel: 'manifest',
      href: `/favicons/site.webmanifest`,
    },
    {
      rel: 'mask-icon',
      href: `/favicons/safari-pinned-tab.svg`,
      color: '#000000',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: `${baseUrl}/favicons/favicon-32x32.png`,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: `${baseUrl}/favicons/favicon-16x16.png`,
    },
  ],
}
export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function extendSEO(options?: SEOProps) {
  const images = options?.image
    ? [{ url: `${baseUrl}/images/og/${options.image}` }]
    : defaultSEO?.openGraph?.images

  return {
    ...defaultSEO,
    ...options,
    url: `${baseUrl}/${options?.url}`,
    openGraph: {
      ...defaultSEO.openGraph,
      images,
      url: `${baseUrl}/${options?.url}`,
    },
  }
}
