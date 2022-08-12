import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const steamIds = process.env.STEAM_IDS
  const steamKey = process.env.STEAM_KEY

  const games = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${steamIds}&include_appinfo=true&format=json`,
    {
      method: 'GET',
    }
  )

  const recently = await fetch(
    `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamKey}&steamid=${steamIds}&format=json`,
    {
      method: 'GET',
    }
  )

  const dataGames = await games.json()
  const dataRecently = await recently.json()

  return res
    .status(200)
    .json({ count: dataGames.response.game_count, recently: dataRecently.response.games[0] })
}

export default withSentry(handler)
