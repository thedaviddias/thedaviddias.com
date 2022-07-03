import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/container'

import { routes } from '@/config/routes'

const Home: NextPage = () => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).home.seo.title}
        description={routes(t).home.seo.description}
        openGraph={routes(t).home.seo.openGraph}
      />
    </Container>
  )
}

export default Home
