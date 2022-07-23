import { Translate } from 'next-translate'

import { defaultSEO, extendSEO } from './seo'

export const routes = (translate: Translate) => ({
  error404: {
    label: translate('404.title'),
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
      description: 'Articles about my passions (including web development and leardership).',
      image: 'images/og/blog.png',
      url: 'blog',
    }),
  },
  // bookmarks: {
  //   label: translate('nav.bookmarks'),
  //   path: '/bookmarks',
  // },
  uses: {
    label: translate('nav.uses'),
    path: '/uses',
    seo: extendSEO({
      title: 'What I use',
      url: 'uses',
    }),
  },
  about: {
    label: translate('nav.about'),
    path: '/about',
    seo: extendSEO({
      title: 'About',
      url: 'about',
    }),
  },
  // analytics: {
  //   label: translate('footer.extra_links.analytics'),
  //   path: 'https://plausible.io/thedaviddias.dev',
  // },
})
