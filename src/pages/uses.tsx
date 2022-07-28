import useTranslation from 'next-translate/useTranslation'

import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'

export default function About() {
  const { t } = useTranslation('common')

  return (
    <BaseLayout
      title={routes(t).uses.seo.title || ''}
      description={routes(t).uses.seo.description || ''}
      openGraph={routes(t).uses.seo}
      className="pt-10 border-none"
    >
      <PageHeader title={routes(t).uses.seo.title} description={routes(t).uses.seo.description} />
    </BaseLayout>
  )
}

// export async function getStaticProps() {
//   const uses = allOtherPages.find((page) => page.slug === 'uses')!;

//   return { props: uses };
// }
