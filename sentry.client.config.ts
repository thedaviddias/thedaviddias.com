// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://0823630951cd4283831b65772dc9ed58@o515454.ingest.sentry.io/6601262',
  tracesSampleRate: 0,
  denyUrls: ['localhost'],
  ignoreErrors: [
    // ignore hydration issues
    'Minified React error #418;',
    'Minified React error #423;',
    'Minified React error #425;',
  ],
})
