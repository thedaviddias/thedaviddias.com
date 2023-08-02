import { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'rss-to-json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rss = await parse('https://thedaviddias.substack.com/feed.xml')
    res.status(200).json(rss)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}
