import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/container'

import { routes } from '@/config/routes'

export default function Blog() {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).blog.seo.title}
        description={routes(t).blog.seo.description}
        openGraph={routes(t).blog.seo.openGraph}
      />
    </Container>
  )
}
