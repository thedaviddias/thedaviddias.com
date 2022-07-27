export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://thedaviddias.com' : ''
export const baseEmail = 'hello@thedaviddias.com'

const title = 'The David Dias | Developer and content creator'
const description = 'Discover'

export const defaultSEO = {
  title,
  description,
  titleTemplate: '%s | The David Dias',
  canonical: `${baseUrl}`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title,
    description,
    site_name: `${title}`,
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

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function extendSEO(options: SEOProps) {
  const images = options.image
    ? [{ url: `${baseUrl}/images/${options.image}` }]
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
