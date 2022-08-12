import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'GET',
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
    },
  })
  const data = await result.json()

  if (!result.ok) {
    return res.status(500).json({ error: 'Error retrieving subscribers' })
  }

  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

  return res.status(200).json({ count: data.length })
}

export default withSentry(handler)
