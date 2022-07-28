import { Translate } from 'next-translate'

import { defaultSEO, extendSEO, SEOProps } from './seo'

export interface RoutesResponse {
  (param: Translate): {
    [key: string]: {
      label: string
      path: string
      seo: SEOProps
    }
  }
}

export const routes: RoutesResponse = (translate) => ({
  error404: {
    label: translate('404.title'),
    path: '',
    seo: extendSEO({
      title: translate('404.seo.title'),
      description: translate('404.seo.description'),
    }),
  },
  home: {
    label: translate('nav.home'),
    path: '/',
    seo: defaultSEO,
  },
  blog: {
    label: 'Blog',
    path: '/blog',
    seo: extendSEO({
      title: 'Blog',
      description: 'Articles about my passions (including web development and leadership).',
      image: 'images/og/blog.png',
      url: 'blog',
    }),
  },
  uses: {
    label: translate('nav.uses'),
    path: '/uses',
    seo: extendSEO({
      title: 'What I use',
      description: 'This is the list of the tools and softwares I use frequently.',
      url: 'uses',
    }),
  },
  about: {
    label: translate('nav.about'),
    path: '/about',
    seo: extendSEO({
      title: 'About me',
      description: 'Learn a little bit about "The David Dias"',
      url: 'about',
    }),
  },
})

export interface PagesResponse {
  (param: Translate, name?: string): {
    [key: string]: {
      title: string
      h1: string
      description: string
    }
  }
}

export const pages: PagesResponse = (translate, name) => ({
  category: {
    title: translate('category.title', { name }),
    h1: translate('category.h1', { name }),
    description: translate('category.description', { name }),
  },
  tag: {
    title: translate('tags.title', { name }),
    h1: translate('tags.h1', { name }),
    description: translate('tags.description', { name }),
  },
})
