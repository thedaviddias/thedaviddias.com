import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/utils/fetcher'

type GetOwnedGamesRes = {
  response: {
    game_count: number
  }
}

async function getOwnedGames(steamKey: string, steamId: string) {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${steamId}&include_appinfo=true&format=json`
  return fetcher<GetOwnedGamesRes>(url, {
    headers: {
      Accept: 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}

type GetPlayedGamesRes = {
  response: {
    games: {
      appid: number
      name: string
      playtime_2weeks: number
      playtime_forever: number
      img_icon_url: string
      playtime_windows_forever: number
      playtime_mac_forever: number
      playtime_linux_forever: number
    }[]
  }
}

async function getPlayedGames(steamKey: string, steamId: string) {
  const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamKey}&steamid=${steamId}&format=json`
  return fetcher<GetPlayedGamesRes>(url, {
    headers: {
      Accept: 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const steamId = process.env.STEAM_USER_ID
  const steamKey = process.env.STEAM_KEY

  try {
    const ownedGames = await getOwnedGames(steamKey, steamId)
    const recentlyPlayed = await getPlayedGames(steamKey, steamId)

    const recentGame =
      recentlyPlayed.response.games[0].appid === 1737100
        ? recentlyPlayed.response.games[1]
        : recentlyPlayed.response.games[0]

    return res.status(200).json({ count: ownedGames.response.game_count, recently: recentGame })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.json(error)
    res.status(405).end()
  }
}

export default withSentry(handler)
