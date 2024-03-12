import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/utils/fetcher'

const now = new Date()

export type GetPlausibleViewsRes = {
  results: {
    visitors: {
      value: number
    }
  }
}

async function getPlausibleViews(slug: string) {
  const url = `https://plausible.io/api/v1/stats/aggregate?site_id=thedaviddias.com&period=12mo&filters=event:page==/articles/${slug}`
  return fetcher<GetPlausibleViewsRes>(url, {
    headers: {
      Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
      Accept: 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}

export type ViewsHandlerRes = {
  requestedSlug: string
  date: string
  views: number
}

const viewsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  if (!slug) {
    return res.status(400).send('Bad request')
  }
  try {
    const data = await getPlausibleViews(String(slug))

    return res.status(200).json({
      requestedSlug: slug,
      date: now.toISOString(),
      views: data?.results?.visitors?.value,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.json(error)
    return res.status(500).end()
  }
}

export default withSentry(viewsHandler)
