import useTranslation from 'next-translate/useTranslation'

import { Unsplash } from '@/components/Unsplash'

import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'
import { WakatimeCard } from '../WakatimeCard'

export const Dashboard = () => {
  const { t } = useTranslation('common')

  return (
    <section className="border-none mb-10">
      <header>
        <H5 as="h2">{t('dashboard.sections.latest-dashboard')}</H5>
      </header>

      <WakatimeCard />

      <Unsplash />

      <footer className="text-right">
        <CustomLink href="/dashboard">{t('dashboard.sections.viewAll')}</CustomLink>
      </footer>
    </section>
  )
}
