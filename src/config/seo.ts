export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://thedaviddias.com' : ''
export const baseEmail = 'hello@thedaviddias.com'

export const defaultSEO = {
  title: 'The David Dias',
  description: '',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'The David Dias',
    images: [
      {
        url: `${baseUrl}/static/og/default.png`,
        alt: 'The David Dias',
      },
    ],
  },
  twitter: {
    handle: '@thedaviddias',
    site: '@thedaviddias',
    cardType: 'summary_large_image',
  },
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function extendSEO(options: SEOProps) {
  const images = options.image
    ? [{ url: `${baseUrl}/static/${options.image}` }]
    : defaultSEO.openGraph.images

  return {
    ...defaultSEO,
    ...options,
    url: `${baseUrl}/${options.url}`,
    openGraph: {
      ...defaultSEO.openGraph,
      images,
      url: `${baseUrl}/${options.url}`,
    },
  }
}
