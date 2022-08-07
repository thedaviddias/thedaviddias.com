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
  articles: {
    label: translate('layout.nav.articles'),
    path: translate('articles.path'),
    h1: translate('articles.h1'),
    seo: extendSEO({
      title: translate('articles.h1'),
      description: translate('articles.seo.description'),
      url: translate('articles.seo.url'),
    }),
  },
  notes: {
    label: translate('layout.nav.notes'),
    path: translate('notes.path'),
    h1: translate('notes.h1'),
    seo: extendSEO({
      title: translate('notes.seo.title'),
      description: translate('notes.seo.description'),
      url: translate('notes.seo.url'),
    }),
  },
  bookmarks: {
    label: translate('layout.nav.bookmarks'),
    path: translate('bookmarks.path'),
    seo: extendSEO({
      title: translate('bookmarks.seo.title'),
      description: translate('bookmarks.seo.description'),
      url: translate('bookmarks.seo.url'),
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
  uses: {
    label: translate('layout.footer.extra_links.uses'),
    path: translate('uses.path'),
    seo: extendSEO({
      title: 'What I use',
      description: 'This is the list of the tools and softwares I use frequently.',
      url: translate('uses.seo.url'),
    }),
  },
  projects: {
    label: translate('layout.nav.projects'),
    path: translate('projects.path'),
    seo: extendSEO({
      title: 'Projects',
      description: '',
      url: translate('projects.seo.url'),
    }),
  },
  analytics: {
    label: translate('layout.footer.extra_links.analytics'),
    path: 'https://plausible.io/thedaviddias.dev',
    seo: extendSEO(),
  },
  resume: {
    label: translate('layout.footer.extra_links.resume'),
    path: 'https://read.cv/thedaviddias',
    seo: extendSEO(),
  },
  gear: {
    label: translate('layout.footer.extra_links.gear'),
    path: 'https://kit.co/thedaviddias',
    seo: extendSEO(),
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
