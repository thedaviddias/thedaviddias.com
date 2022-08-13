import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/utils/fetcher'

type addSubscribers = {
  error: {
    email: any
  }
}

async function addSubscribers(email: string) {
  const url = 'https://www.getrevue.co/api/v2/subscribers'
  return fetcher<addSubscribers>(url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const result = await addSubscribers(email)

  if (!result) {
    return res.status(500).json({ error: result })
  }

  return res.status(201).json({ error: '' })
}

export default withSentry(handler)
