import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

// import '../styles/prose.css'
import SEO from '../../next-seo.config'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PlausibleProvider domain="thedaviddias.dev" trackOutboundLinks={true}>
      <DefaultSeo {...SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  )
}

export default App
