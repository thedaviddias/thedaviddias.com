import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'
import '@/styles/prism.css'

import SEO from '../../next-seo.config'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PlausibleProvider domain="thedaviddias.com" trackOutboundLinks={true}>
      <ThemeProvider attribute="class">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  )
}

export default App
