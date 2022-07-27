import useTranslation from 'next-translate/useTranslation'

import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'

export default function About() {
  const { t } = useTranslation('common')

  return (
    <BaseLayout
      title={routes(t).about.seo.title || ''}
      description={routes(t).about.seo.description || ''}
      openGraph={routes(t).about.seo}
      className="pt-10 border-none"
    >
      <PageHeader title={routes(t).about.seo.title} description={routes(t).about.seo.description} />
    </BaseLayout>
  )
}
