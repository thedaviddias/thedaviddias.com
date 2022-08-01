export async function loadBookmarks() {
  // Call an external API endpoint to get posts
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
}
