import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

import googleAuth from '@/lib/google'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const youtubeId = process.env.YOUTUBE_CHANNEL_ID
  if (!youtubeId) {
    throw Error('YOUTUBE_CHANNEL_ID not found in .env!')
  }

  try {
    const auth = await googleAuth.getClient()

    // @ts-ignore
    const youtube = google.youtube({ version: 'v3', auth })

    const listVideos = await youtube.search.list({
      channelId: youtubeId,
      maxResults: 3,
      order: 'date',
      type: ['video'],
      regionCode: 'CA',
      part: ['snippet'],
    })

    const videos = listVideos.data.items

    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

    return res.status(200).json({
      videos,
    })
  } catch (error) {
    res.json(error)
    res.status(405).end()
  }
}

export default handler
