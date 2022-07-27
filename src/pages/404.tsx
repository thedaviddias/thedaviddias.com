import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/Container'
import { H1 } from '@/components/Headings'

import { routes } from '@/config/routes'

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Container>
      <NextSeo
        title={routes(t).error404.seo.title}
        description={routes(t).error404.seo.description}
        openGraph={routes(t).error404.seo}
      />
      <section className="pt-10 border-none">
        <header>
          <H1>{routes(t).error404.seo.title}</H1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
            {routes(t).error404.seo.description}
          </p>
        </header>
      </section>
      <button onClick={() => router.push('/')}>Back Home</button>
    </Container>
  )
}

export default NotFoundPage
