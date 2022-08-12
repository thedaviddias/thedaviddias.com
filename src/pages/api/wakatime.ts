import { RANGE, WakaTimeApi } from '@nick22985/wakatime-api'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.WAKATIME_API_KEY
  const wakaClient = apiKey && new WakaTimeApi(apiKey)

  const getMyStats = wakaClient && (await wakaClient.getMyStats(RANGE.LAST_7_DAYS))

  return res.status(200).json({
    daily_average: getMyStats.data.daily_average_including_other_language,
    total_seconds: getMyStats.data.total_seconds_including_other_language,
  })
}

export default withSentry(handler)
