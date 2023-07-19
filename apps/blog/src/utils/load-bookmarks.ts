type Bookmarks = {
  excerpt: string
  note: string
  type: string
  cover: string
  tags: string[]
  removed: false
  _id: number
  collection: unknown[]
  user: unknown[]
  link: string
  title: string
  domain: string
  lastUpdate: string
  sort: number
  media: unknown[]
  created: string
  cache: unknown[]
  highlights: []
  collectionId: number
}

type LoadBookmarksResponse = {
  result: boolean
  items: Bookmarks[]
  count: number
  collectionId: number
}

export async function loadBookmarks(): Promise<LoadBookmarksResponse | undefined> {
  try {
    const res = await fetch(
      `https://api.raindrop.io/rest/v1/raindrops/${process.env.RAINDROP_COLLECTION}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RAINDROP_TOKEN}`,
        },
      }
    )
    const data = await res.json()

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error', error)
  }
}
