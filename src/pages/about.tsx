import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/Container'
import { HeaderPage } from '@/components/header-page'

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
        <HeaderPage
          title={routes(t).about.seo.title}
          description={routes(t).about.seo.description}
        />
      </main>
    </Container>
  )
}
