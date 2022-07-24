import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/container'
import { HeaderPage } from '@/components/header-page'
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
        <HeaderPage title={routes(t).uses.seo.title} description={routes(t).uses.seo.description} />
      </main>
    </Container>
  )
}
