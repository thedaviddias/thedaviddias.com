import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/container'
import { H1 } from '@/components/heading'

import { routes } from '@/config/routes'

export default function About() {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).about.seo.title}
        description={routes(t).about.seo.description}
        openGraph={routes(t).about.seo.openGraph}
      />
      <main className="pt-10 border-none">
        <header>
          <H1>{routes(t).about.seo.title}</H1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
            {routes(t).about.seo.description}
          </p>
        </header>
      </main>
    </Container>
  )
}
