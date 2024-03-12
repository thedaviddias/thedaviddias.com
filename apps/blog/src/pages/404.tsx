import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'

import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const plausible = usePlausible()

  useEffect(() => {
    plausible('404', {
      props: { page: document.location.pathname },
    })
  }, [plausible])

  return (
    <BaseLayout
      title={routes(t).error404.seo.title || ''}
      description={routes(t).error404.seo.description || ''}
      openGraph={routes(t).error404.seo}
      className="border-none pt-10"
    >
      <PageHeader
        title={routes(t).error404.seo.title}
        description={routes(t).error404.seo.description}
      />
      <div className="mt-10 text-center">
        <button onClick={() => router.push('/')}>{t('404:404.back_home')}</button>
      </div>
    </BaseLayout>
  )
}

export default NotFoundPage
