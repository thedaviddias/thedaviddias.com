import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const frontendchecklist = await fetch(`https://opencollective.com/front-end-checklist.json`, {
    method: 'GET',
  })

  const htmlhint = await fetch(`https://opencollective.com/htmlhint.json`, {
    method: 'GET',
  })

  const dataFrontendchecklist = await frontendchecklist.json()
  const dataHtmlhint = await htmlhint.json()

  return res.status(200).json({ projects: [dataFrontendchecklist, dataHtmlhint] })
}
