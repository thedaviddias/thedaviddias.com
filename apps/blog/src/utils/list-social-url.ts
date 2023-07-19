import { LinksExternalResponse } from '@/constants'

/**
 * Transform a list of social media in a list of links
 *
 * @param socials
 * @returns
 */
export const listSocialUrl = (socials: LinksExternalResponse[]): string[] => {
  return socials.reduce((acc: string[], item) => {
    acc.push(item.link)

    return acc
  }, [])
}
