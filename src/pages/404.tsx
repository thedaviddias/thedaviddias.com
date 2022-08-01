import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <BaseLayout
      title={routes(t).error404.seo.title || ''}
      description={routes(t).error404.seo.description || ''}
      openGraph={routes(t).error404.seo}
    >
      <PageHeader
        title={routes(t).error404.seo.title}
        description={routes(t).error404.seo.description}
      />
      <button onClick={() => router.push('/')}>Back Home</button>
    </BaseLayout>
  )
}

export default NotFoundPage
