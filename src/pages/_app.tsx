import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import '@/styles/prism.css'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
