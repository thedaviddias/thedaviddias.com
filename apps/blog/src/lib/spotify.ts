import {
  GET_PODCAST_ERREUR_200,
  GET_PODCAST_WWS,
  NOW_PLAYING_ENDPOINT,
  TOKEN_ENDPOINT,
  TOP_TRACKS_ENDPOINT,
} from '@/constants'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:
      refresh_token &&
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
  })

  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getPodcastErreur200 = async () => {
  const { access_token } = await getAccessToken()

  return fetch(GET_PODCAST_ERREUR_200, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const getWorldWebStories = async () => {
  const { access_token } = await getAccessToken()

  return fetch(GET_PODCAST_WWS, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
}
