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
        title={routes(t).uses.seo.title}
        description={routes(t).uses.seo.description}
        openGraph={routes(t).uses.seo.openGraph}
      />
      <main className="pt-10 border-none">
        <header>
          <H1>{routes(t).uses.seo.title}</H1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
            {routes(t).uses.seo.description}
          </p>
        </header>
      </main>
    </Container>
  )
}
