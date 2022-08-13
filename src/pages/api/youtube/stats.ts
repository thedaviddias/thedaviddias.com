import { withSentry } from '@sentry/nextjs'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

import googleAuth from '@/lib/google'

const YoutubeStatsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const youtubeId = process.env.YOUTUBE_CHANNEL_ID

  try {
    const auth = await googleAuth.getClient()
    const youtube = google.youtube({
      auth,
      version: 'v3',
    })

    const response = await youtube.channels.list({
      id: [youtubeId],
      part: ['statistics'],
    })

    const channel = response.data.items && response?.data.items[0]
    const { subscriberCount, viewCount, videoCount } = channel?.statistics as any

    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

    return res.status(200).json({
      subscriberCount,
      viewCount,
      videoCount,
    })
  } catch (error) {
    res.json(error)
    res.status(405).end()
  }
}

export default withSentry(YoutubeStatsHandler)
