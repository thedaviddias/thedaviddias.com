import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { CollectiveCard } from '@/components/CollectiveCard'
import { Container } from '@/components/Container'
import { H2 } from '@/components/Headings'
import { PageHeader } from '@/components/PageHeader'
import { SimklCard } from '@/components/Simkl'
import { SteamCard } from '@/components/SteamCard'
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

        <section className="mb-10">
          <H2>{t('dashboard.sections.coding.title')}</H2>
          <WakatimeCard />
          <CollectiveCard />
        </section>

        <section className="mb-10">
          <H2>{t('dashboard.sections.photos.title')}</H2>
          <Unsplash />
        </section>

        <section className="mb-10">
          <H2>{t('dashboard.sections.tv.title')}</H2>
          <SimklCard />
        </section>

        <section className="mb-10">
          <H2>{t('dashboard.sections.gaming.title')}</H2>
          <SteamCard />
        </section>
      </main>
    </Container>
  )
}

export default DashboardPage
