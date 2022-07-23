import { NextApiRequest, NextApiResponse } from 'next'
import { CachedPost } from 'types'

import { cachedPosts } from '../../cache/blog'

type Data = {
  results: string[]
}

const blogPosts = cachedPosts as CachedPost[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const results = req.query.q
    ? blogPosts.filter((post) =>
        post.frontMatter.title.toLowerCase().includes(req.query.q.toString())
      )
    : blogPosts
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ results }))
}
