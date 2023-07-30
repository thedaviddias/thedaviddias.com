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
    label: translate('common:404.seo.title'),
    path: '',
    seo: extendSEO({
      options: {
        title: translate('common:404.seo.title'),
        description: translate('common:404.seo.description'),
      },
      translate,
    }),
  },
  home: {
    label: translate('common:layout.nav.home'),
    path: translate('common:home.path'),
    seo: extendSEO({
      options: {
        title: translate('common:home.seo.title'),
        description: translate('common:home.seo.description'),
      },
      translate,
    }),
  },
  articles: {
    label: translate('common:layout.nav.articles'),
    path: translate('common:articles.path'),
    h1: translate('common:articles.h1'),
    seo: extendSEO({
      options: {
        title: translate('common:articles.h1'),
        description: translate('common:articles.seo.description'),
        url: translate('common:articles.seo.url'),
      },
      translate,
    }),
  },
  tags: {
    label: translate('common:layout.footer.extra_links.tags'),
    path: translate('common:tags.path'),
    h1: translate('common:tags.h1'),
    seo: extendSEO({
      options: {
        title: translate('common:tags.h1'),
        description: translate('common:tags.seo.description'),
        url: translate('common:tags.seo.url'),
      },
      translate,
    }),
  },
  notes: {
    label: translate('common:layout.nav.notes'),
    path: translate('common:notes.path'),
    h1: translate('common:notes.h1'),
    seo: extendSEO({
      options: {
        title: translate('common:notes.seo.title'),
        description: translate('common:notes.seo.description'),
        url: translate('common:notes.seo.url'),
      },
      translate,
    }),
  },
  about: {
    label: translate('common:layout.nav.about'),
    path: translate('common:about.path'),
    seo: extendSEO({
      options: {
        title: translate('common:about.seo.title'),
        description: translate('common:about.seo.description'),
        url: translate('common:about.seo.url'),
      },
      translate,
    }),
  },
  uses: {
    label: translate('common:layout.footer.extra_links.uses'),
    path: translate('common:uses.path'),
    seo: extendSEO({
      options: {
        title: translate('common:uses.seo.title'),
        description: translate('common:uses.seo.description'),
        url: translate('common:uses.seo.url'),
      },
      translate,
    }),
  },
  supporters: {
    label: translate('common:layout.nav.supporters'),
    path: translate('common:supporters.path'),
    seo: extendSEO({
      options: {
        title: translate('common:supporters.seo.title'),
        description: translate('common:supporters.seo.description'),
        url: translate('common:supporters.seo.url'),
      },
      translate,
    }),
  },
  projects: {
    label: translate('common:layout.nav.projects'),
    path: translate('common:projects.path'),
    seo: extendSEO({
      options: {
        title: translate('common:projects.seo.title'),
        description: translate('common:projects.seo.description'),
        url: translate('common:projects.seo.url'),
      },
      translate,
    }),
  },
  dashboard: {
    label: translate('common:layout.footer.extra_links.dashboard'),
    path: translate('common:dashboard.path'),
    seo: extendSEO({
      options: {
        title: translate('common:dashboard.seo.title'),
        description: translate('common:dashboard.seo.description'),
        url: translate('common:dashboard.seo.url'),
      },
      translate,
    }),
  },
  analytics: {
    label: translate('common:layout.footer.extra_links.analytics'),
    path: 'https://plausible.io/thedaviddias.dev',
    seo: extendSEO({ options: {}, translate }),
  },
  resume: {
    label: translate('common:layout.footer.extra_links.resume'),
    path: 'https://read.cv/thedaviddias',
    seo: extendSEO({ options: {}, translate }),
  },
  gear: {
    label: translate('common:layout.footer.extra_links.gear'),
    path: 'https://kit.co/thedaviddias',
    seo: extendSEO({ options: {}, translate }),
  },
  rss: {
    menu: false,
    label: translate('common:layout.nav.rss'),
    path: translate('common:rss.path'),
    seo: extendSEO({ options: {}, translate }),
    locale: false,
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
