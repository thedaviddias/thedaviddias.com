import type { NextApiRequest, NextApiResponse } from 'next'

import { getPodcastErreur200, getWorldWebStories } from '@/lib/spotify'

export type PodcastsResponse = {
  podcast: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const query = req.query
  const { lang } = query

  const resErreur200 = lang === 'fr' ? await getPodcastErreur200() : null
  const resWWS = lang === 'en' ? await getWorldWebStories() : null

  const regEx =
    /^(?:spotify:|(?:https?:\/\/(?:open|api|play)\.spotify\.com\/))(?:v1)?\/?(episodes)(?::|\/)((?:[0-9a-zA-Z]){22})/

  if (resErreur200) {
    const podcastErreur200 = await resErreur200.json()
    const podcastIdErreur200 = podcastErreur200.items[0].href
    const matchErreur200 = podcastIdErreur200.match(regEx)

    return res.status(200).json({
      podcast: `https://open.spotify.com/embed-podcast/episode/${
        matchErreur200 && matchErreur200[2]
      }?market=FR&`,
    })
  }

  if (resWWS) {
    const podcastWWS = await resWWS.json()
    const podcastIdWWS = podcastWWS.items[0].href
    const matchWorldWebStories = podcastIdWWS.match(regEx)

    return res.status(200).json({
      podcast: `https://open.spotify.com/embed-podcast/episode/${
        matchWorldWebStories && matchWorldWebStories[2]
      }?`,
    })
  }
}
