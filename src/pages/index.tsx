import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { routes } from '@/config/routes'

const Home: NextPage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <NextSeo
        title={routes(t).home.seo.title}
        description={routes(t).home.seo.description}
        openGraph={routes(t).home.seo.openGraph}
      />
    </>
  )
}

export default Home
