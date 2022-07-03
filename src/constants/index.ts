import { Translate } from 'next-translate'
import { routes } from 'src/config/routes'

export const TWITTER_PROFILE = 'https://ddias.run/tw'
export const GITHUB_PROFILE = 'https://github.com/thedaviddias'
export const YOUTUBE_CHANNEL = 'https://ddias.run/yt'
export const TWITCH_CHANNEL = 'https://ddias.run/twi'
export const LINKEDIN_PROFILE = 'https://linkedin.com/in/thedaviddias'
export const INSTAGRAM_PROFILE = 'https://www.instagram.com/thedaviddias/'
export const FACEBOOK_PROFILE = 'https://www.facebook.com/thedaviddias'
export const RSS_FEED = 'https://thedaviddias.dev/rss.xml'

type LinksInternalResponse = {
  label: string
  path: string
}

type LinksExternalResponse = {
  label: string
  link: string
}

export const MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).blog,
  routes(translate).bookmarks,
  routes(translate).uses,
  routes(translate).about,
]

export const FOOTER_MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).home,
  ...[...MENU_LINKS(translate)],
]

export const EXTRA_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).newsletter,
  routes(translate).analytics,
]

export const SOCIAL_LINKS: LinksExternalResponse[] = [
  {
    label: 'Twitter',
    link: TWITTER_PROFILE,
  },
  {
    label: 'Github',
    link: GITHUB_PROFILE,
  },
  {
    label: 'YouTube',
    link: YOUTUBE_CHANNEL,
  },
  {
    label: 'Twitch',
    link: TWITCH_CHANNEL,
  },
  {
    label: 'LinkedIn',
    link: LINKEDIN_PROFILE,
  },
]
