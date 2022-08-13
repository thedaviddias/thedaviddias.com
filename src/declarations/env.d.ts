export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Unsplash metrics
      UNSPLASH_ACCESS_KEY: string

      // Analytics
      PLAUSIBLE_API_KEY: string

      // Github projects
      GH_PUBLIC_TOKEN: string

      // Bookmarks
      RAINDROP_COLLECTION: string
      RAINDROP_TOKEN: string

      // Shows and movies stats
      SIMKL_USER_ID: string
      SIMKL_TOKEN: string
      SIMKL_CLIENT_ID: string

      // Newsletters metrics
      REVUE_API_KEY: string

      // Code metrics
      WAKATIME_API_KEY: string

      // Steam
      STEAM_USER_ID: string
      STEAM_KEY: string

      // Foursquare
      FOURSQUARE_API_KEY: string
      FOURSQUARE_CLIENT_ID: string

      // Spotify
      SPOTIFY_CLIENT_ID: string
      SPOTIFY_CLIENT_SECRET: string
      SPOTIFY_REFRESH_TOKEN: string

      // YouTube metrics
      GOOGLE_CLIENT_EMAIL: string
      GOOGLE_PRIVATE_KEY: string
    }
  }
}
