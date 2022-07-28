import social from 'data/social.json'
import { Translate } from 'next-translate'
import { routes } from 'src/config/routes'

export const TWITTER_PROFILE = 'https://ddias.run/tw'
export const GITHUB_PROFILE = 'https://github.com/thedaviddias'
export const POLYWORK_PROFILE = 'https://ddias.run/changelog'

type LinksInternalResponse = {
  label: string
  path: string
}

export type LinksExternalResponse = {
  label: string
  link: string
}

export const MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).blog,
  // routes(translate).bookmarks,
  // routes(translate).uses,
  routes(translate).about,
]

export const FOOTER_MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).home,
  ...[...MENU_LINKS(translate)],
]

// export const EXTRA_LINKS = (translate: Translate): LinksInternalResponse[] => [
//   routes(translate).newsletter,
//   routes(translate).analytics,
// ]

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
