import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          <link
            rel="preload"
            href="/fonts/oswald.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSansPro-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSansPro-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSansPro-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta
            name="google-site-verification"
            content="_6qNCkTis9PqmGX1r5Nhe_b14nRXmJ9nos2yeCN_eaw"
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
