import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/Container'
import { H1 } from '@/components/Heading'
import { PageHeader } from '@/components/PageHeader'

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
        <PageHeader title={routes(t).uses.seo.title} description={routes(t).uses.seo.description} />
      </main>
    </Container>
  )
}
