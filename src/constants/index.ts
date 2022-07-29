import social from 'data/social.json'
import { Translate } from 'next-translate'
import { routes } from 'src/config/routes'

import { SEOProps } from '@/config/seo'

export const TWITTER_PROFILE = 'https://twitter.com/thedaviddias'
export const GITHUB_PROFILE = 'https://github.com/thedaviddias'
export const POLYWORK_PROFILE = 'https://changelog.thedaviddias.dev'

export type LinksInternalResponse = {
  /** Indicates if it should show in the navigation menu */
  menu?: boolean
  label: string
  path: string
  seo: SEOProps
}

export type LinksExternalResponse = {
  label: string
  link: string
}

export const MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).blog,
  routes(translate).about,
  routes(translate).rss,
]

export const FOOTER_MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).home,
  ...[...MENU_LINKS(translate)],
]

export const SOCIAL_LINKS: LinksExternalResponse[] = social.slice(0, 6)

export const HERO_LINKS = [
  {
    label: 'Personal changelog',
    link: POLYWORK_PROFILE,
  },
  {
    label: 'Twitter',
    link: TWITTER_PROFILE,
  },
  {
    label: 'Github',
    link: GITHUB_PROFILE,
  },
]
