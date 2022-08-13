import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/utils/fetcher'

async function GetStatsUser(userId: string, token: string, clientId: string) {
  const url = `https://api.simkl.com/users/${userId}/stats`
  return fetcher(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'simkl-api-key': clientId,
    } as any,
    method: 'POST',
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = process.env.SIMKL_TOKEN
  const clientId = process.env.SIMKL_CLIENT_ID
  const userId = process.env.SIMKL_USER_ID

  try {
    const stats = await GetStatsUser(userId, token, clientId)

    return res.status(200).json({ stats })
  } catch (error) {
    res.json(error)
    res.status(405).end()
  }
}

export default withSentry(handler)
