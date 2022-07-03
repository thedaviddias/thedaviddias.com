import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'
import { DefaultSeo } from 'next-seo'
import { BaseLayout } from '@/components/layouts'

import SEO from '../../next-seo.config'

const App = ({ Component, pageProps }: AppProps) => {
  return (
  <PlausibleProvider domain="thedaviddias.dev" trackOutboundLinks={true}>
    <DefaultSeo {...SEO} />
    <BaseLayout>
    <Component {...pageProps} />
    </BaseLayout>
  </PlausibleProvider>
  )
}

export default App
