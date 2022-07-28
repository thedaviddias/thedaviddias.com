import social from 'data/social.json'
import { SocialProfileJsonLd } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'
import { listSocialUrl } from '@/utils/list-social-url'

export default function About() {
  const { t } = useTranslation('common')

  return (
    <BaseLayout
      title={routes(t).about.seo.title || ''}
      description={routes(t).about.seo.description || ''}
      openGraph={routes(t).about.seo}
      className="pt-10 border-none"
    >
      <SocialProfileJsonLd
        type="Person"
        name="David Dias"
        url="https://thedavidias.dev"
        sameAs={listSocialUrl(social)}
      />
      <PageHeader title={routes(t).about.seo.title} description={routes(t).about.seo.description} />
    </BaseLayout>
  )
}
