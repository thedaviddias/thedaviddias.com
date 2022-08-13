import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const frontendchecklist = await fetch(`https://opencollective.com/front-end-checklist.json`, {
      method: 'GET',
    })

    const htmlhint = await fetch(`https://opencollective.com/htmlhint.json`, {
      method: 'GET',
    })

    const dataFrontendchecklist = await frontendchecklist.json()
    const dataHtmlhint = await htmlhint.json()

    return res.status(200).json({ projects: [dataFrontendchecklist, dataHtmlhint] })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.json(error)
    res.status(405).end()
  }
}

export default withSentry(handler)
