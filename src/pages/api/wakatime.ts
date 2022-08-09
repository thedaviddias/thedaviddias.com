import { RANGE, WakaTimeApi } from '@nick22985/wakatime-api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.WAKATIME_API_KEY
  const wakaClient = apiKey && new WakaTimeApi(apiKey)

  const getMyStats = wakaClient && (await wakaClient.getMyStats(RANGE.LAST_7_DAYS))

  return res.status(200).json({
    daily_average: getMyStats.data.daily_average_including_other_language,
    total_seconds: getMyStats.data.total_seconds_including_other_language,
  })
}
