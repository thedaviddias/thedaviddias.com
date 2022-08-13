import { RANGE, WakaTimeApi } from '@nick22985/wakatime-api'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const wakatimeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.WAKATIME_API_KEY
  const wakaClient = apiKey && new WakaTimeApi(apiKey)

  try {
    const getMyStats = wakaClient && (await wakaClient.getMyStats(RANGE.LAST_7_DAYS))

    return res.status(200).json({
      daily_average: getMyStats.data.daily_average_including_other_language,
      total_seconds: getMyStats.data.total_seconds_including_other_language,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.json(error)
    res.status(405).end()
  }
}

export default withSentry(wakatimeHandler)
