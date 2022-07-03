import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'
import '@/styles/prism.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PlausibleProvider domain="thedaviddias.dev" trackOutboundLinks={true}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  )
}

export default App
