import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Unsplash } from '@/components/Unsplash'
import { WakatimeCard } from '@/components/WakatimeCard'

import { routes } from '@/config/routes'

const DashboardPage = () => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).dashboard.seo.title}
        description={routes(t).dashboard.seo.description}
        openGraph={routes(t).dashboard.seo}
      />
      <main className="mb-5 mt-5">
        <PageHeader
          title={routes(t).dashboard.seo.title}
          description={routes(t).dashboard.seo.description}
        />

        <Unsplash />

        <WakatimeCard />
      </main>
    </Container>
  )
}

export default DashboardPage
