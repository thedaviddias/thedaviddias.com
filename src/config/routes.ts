import { Translate } from 'next-translate'

import { LinksInternalResponse } from '@/constants'

import { extendSEO } from './seo'

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
      options: {
        title: translate('404.seo.title'),
        description: translate('404.seo.description'),
      },
      translate,
    }),
  },
  home: {
    label: translate('layout.nav.home'),
    path: translate('home.path'),
    seo: extendSEO({
      options: {
        title: translate('home.seo.title'),
        description: translate('home.seo.description'),
      },
      translate,
    }),
  },
  articles: {
    label: translate('layout.nav.articles'),
    path: translate('articles.path'),
    h1: translate('articles.h1'),
    seo: extendSEO({
      options: {
        title: translate('articles.h1'),
        description: translate('articles.seo.description'),
        url: translate('articles.seo.url'),
      },
      translate,
    }),
  },
  notes: {
    label: translate('layout.nav.notes'),
    path: translate('notes.path'),
    h1: translate('notes.h1'),
    seo: extendSEO({
      options: {
        title: translate('notes.seo.title'),
        description: translate('notes.seo.description'),
        url: translate('notes.seo.url'),
      },
      translate,
    }),
  },
  bookmarks: {
    label: translate('layout.nav.bookmarks'),
    path: translate('bookmarks.path'),
    seo: extendSEO({
      options: {
        title: translate('bookmarks.seo.title'),
        description: translate('bookmarks.seo.description'),
        url: translate('bookmarks.seo.url'),
      },
      translate,
    }),
  },
  about: {
    label: translate('layout.nav.about'),
    path: translate('about.path'),
    seo: extendSEO({
      options: {
        title: translate('about.seo.title'),
        description: translate('about.seo.description'),
        url: translate('about.seo.url'),
      },
      translate,
    }),
  },
  uses: {
    label: translate('layout.footer.extra_links.uses'),
    path: translate('uses.path'),
    seo: extendSEO({
      options: {
        title: translate('uses.seo.title'),
        description: translate('uses.seo.description'),
        url: translate('uses.seo.url'),
      },
      translate,
    }),
  },
  projects: {
    label: translate('layout.nav.projects'),
    path: translate('projects.path'),
    seo: extendSEO({
      options: {
        title: translate('projects.seo.title'),
        description: translate('projects.seo.description'),
        url: translate('projects.seo.url'),
      },
      translate,
    }),
  },
  analytics: {
    label: translate('layout.footer.extra_links.analytics'),
    path: 'https://plausible.io/thedaviddias.dev',
    seo: extendSEO({ options: {}, translate }),
  },
  resume: {
    label: translate('layout.footer.extra_links.resume'),
    path: 'https://read.cv/thedaviddias',
    seo: extendSEO({ options: {}, translate }),
  },
  gear: {
    label: translate('layout.footer.extra_links.gear'),
    path: 'https://kit.co/thedaviddias',
    seo: extendSEO({ options: {}, translate }),
  },
  rss: {
    menu: false,
    label: translate('layout.nav.rss'),
    path: translate('rss.path'),
    seo: extendSEO({ options: {}, translate }),
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
