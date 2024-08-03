import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'
import '@/styles/prism.css'

import SEO from '../../next-seo.config'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <PlausibleProvider domain="thedaviddias.com" trackOutboundLinks={true}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-4NMCVETX8K" />}
      </PlausibleProvider>
    </ThemeProvider>
  )
}

export default App
