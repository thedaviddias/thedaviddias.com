import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import generateRssFeed from '@/lib/generateRss'

import { CustomLink } from '@/components/CustomLink'
import { LatestNotesSection } from '@/components/LatestNotesSection'
import { LatestPostsSection } from '@/components/LatestPostsSection'

import { routes } from '@/config/routes'
import { CONTENT_TYPE, HERO_LINKS } from '@/constants'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getAllPostsWithFrontMatter } from '@/utils/get-articles-posts'

const PodcastSection = dynamic(() => import('../components/PodcastSection'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

type HomeProps = {
  articles: any[]
  notes: any[]
}

const Home: NextPage<HomeProps> = ({ articles, notes }) => {
  const { t } = useTranslation('common')

  return (
    <BaseLayout
      title={routes(t).home.seo.title}
      description={routes(t).home.seo.description}
      titleTemplate="%s"
      openGraph={routes(t).home.seo}
    >
      <section className="pb-20 pt-0 lg:pt-10 flex justify-evenly">
        <div className="text-left">
          <h1 className="block mb-4 dark:text-white transition-colors">
            <p className="text-3xl p-0 font-light uppercase">{t('home.hero.greetings1')}</p>
            <span className="text-5xl lg:text-6xl font-title font-medium leading-snug">
              {t('home.hero.greetings2')}
            </span>
          </h1>
          <div
            className="max-w-xl lg:px-0.5 text-base lg:text-lg sm:text-xl text-gray-500 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: t('home.hero.presentation') }}
          />
          <div className="flex justify-left mt-10 space-x-5">
            {HERO_LINKS.map(({ label, link }) => (
              <CustomLink
                href={link}
                key={link}
                className="font-semibold dark:!text-white"
                passHref
              >
                {label}
              </CustomLink>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <Image
            className="rounded-full"
            src="/images/david-dias-round.jpg"
            width={270}
            height={270}
            alt="Photo of David Dias"
          />
        </div>
      </section>

      <LatestNotesSection notes={notes} />

      <LatestPostsSection articles={articles} />

      {process.env.NODE_ENV === 'production' && <PodcastSection />}
    </BaseLayout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const posts = getAllPostsWithFrontMatter({ dataType: CONTENT_TYPE.ARTICLE, locale, limit: 4 })
  const notes = getAllPostsWithFrontMatter({ dataType: CONTENT_TYPE.NOTE, locale, limit: 4 })
  await generateRssFeed().then(null)

  const props: HomeProps = {
    articles: JSON.parse(JSON.stringify(posts)),
    notes: JSON.parse(JSON.stringify(notes)),
  }

  return {
    props,
  }
}

export default Home
