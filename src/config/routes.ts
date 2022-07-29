import { Translate } from 'next-translate'

import { LinksInternalResponse } from '@/constants'

import { defaultSEO, extendSEO } from './seo'

export interface RoutesResponse {
  (param: Translate): {
    [key: string]: LinksInternalResponse
  }
}

export const routes: RoutesResponse = (translate) => ({
  error404: {
    label: translate('404.seo.title'),
    path: '',
    seo: extendSEO({
      title: translate('404.seo.title'),
      description: translate('404.seo.description'),
    }),
  },
  home: {
    label: translate('layout.nav.home'),
    path: '/',
    seo: defaultSEO,
  },
  blog: {
    label: translate('layout.nav.blog'),
    path: translate('blog.path'),
    seo: extendSEO({
      title: translate('blog.seo.title'),
      description: translate('blog.seo.description'),
      url: translate('blog.seo.url'),
    }),
  },
  about: {
    label: translate('layout.nav.about'),
    path: translate('about.path'),
    seo: extendSEO({
      title: translate('about.seo.title'),
      description: translate('about.seo.description'),
      url: translate('about.seo.url'),
    }),
  },
  rss: {
    menu: false,
    label: translate('layout.nav.rss'),
    path: translate('rss.path'),
    seo: extendSEO(),
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
    title: translate('category.seo.title', { name }),
    h1: translate('category.h1', { name }),
    description: translate('category.seo.description', { name }),
  },
  tag: {
    title: translate('tags.seo.title', { name }),
    h1: translate('tags.h1', { name }),
    description: translate('tags.seo.description', { name }),
  },
})
