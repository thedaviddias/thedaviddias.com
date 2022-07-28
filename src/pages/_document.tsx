import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                defer
                data-domain="thedaviddias.dev"
                src="https://plausible.io/js/plausible.js"
              />
            </>
          )}
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
