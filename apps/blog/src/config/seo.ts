import { Translate } from 'next-translate'

import { BASE_URL } from '@/constants'

import defaultSEO from '../../next-seo.config'

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
    url: `${translate('common:home.path')}${options?.url ? `/${options?.url}` : ''}`,
    openGraph: {
      ...defaultSEO.openGraph,
      locale,
      title: translate('home.seo.title'),
      description: translate('home.seo.description'),
      site_name: translate('home.seo.title'),
      images,
      url: `${translate('common:home.path')}${options?.url ? `/${options?.url}` : ''}`,
    },
  }
}
