import type { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/utils/fetcher'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'

type GetPlausibleTopPagesResults = {
  visitors: number
  page: string
}

export type GetPlausibleTopPagesRes = {
  results: GetPlausibleTopPagesResults[]
}

async function getPlausibleTopPages() {
  const url = `https://plausible.io/api/v1/stats/breakdown?site_id=thedaviddias.com&period=6mo&property=event:page&limit=10`
  return fetcher<GetPlausibleTopPagesRes>(url, {
    headers: {
      Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
      Accept: 'application/json',
      'cache-control': 'public, s-maxage=2592000, stale-while-revalidate=1296000',
    },
  })
}

export type TopPageHandlerRes = {
  results: {
    title: string
    visitors: number
    page: string
  }[]
}

const topPageHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await getPlausibleTopPages()

    if (!data?.results) {
      throw new Error('Could not get results from Plausible')
    }

    const allPostHeaders = getAllPostsWithFrontMatter({ dataType: 'articles', locale: 'en' })

    const popularArticles = data.results
      .map((result: GetPlausibleTopPagesResults) => {
        const url = result.page
        const slug = url.split('/').pop() || '' // Extracts the last part of the URL
        const article = allPostHeaders.find((post) => post.slug === slug)

        if (article) {
          return { ...result, title: article.frontMatter.title }
        } else {
          return result
        }
      })
      .filter((article: any) => article.title) // Keep only articles that have a title
      .slice(0, 5) // Keep only the first 5 results

    return res.status(200).json({ results: popularArticles })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.json(error)
    return res.status(500).end()
  }
}

export default topPageHandler
