import { NextSeoProps } from 'next-seo'
import { Translate } from 'next-translate'

import { BASE_URL } from '@/constants'

const defaultSEO: NextSeoProps = {
  titleTemplate: '%s | The David Dias',
  defaultTitle: 'The David Dias',
  openGraph: {
    type: 'website',
    url: 'https://thedaviddias.dev',
    profile: {
      firstName: 'David',
      lastName: 'Dias',
      gender: 'male',
    },
    images: [
      {
        url: `/og/default.png`,
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
      href: `/favicons/favicon-32x32.png`,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: `/favicons/favicon-16x16.png`,
    },
  ],
}
export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

type ExtendSEOProps = {
  options?: SEOProps
  locale?: string
  translate: Translate
}

export function extendSEO({ options, locale, translate }: ExtendSEOProps) {
  const images = options?.image
    ? [{ url: `${BASE_URL}/images/og/${options.image}` }]
    : defaultSEO?.openGraph?.images

  return {
    ...defaultSEO,
    title: translate('home.seo.title'),
    description: translate('home.seo.description'),
    ...options,
    url: `${translate('home.path')}${options?.url ? `/${options?.url}` : ''}`,
    openGraph: {
      ...defaultSEO.openGraph,
      locale,
      title: translate('home.seo.title'),
      description: translate('home.seo.description'),
      site_name: translate('home.seo.title'),
      images,
      url: `${translate('home.path')}${options?.url ? `/${options?.url}` : ''}`,
    },
  }
}
