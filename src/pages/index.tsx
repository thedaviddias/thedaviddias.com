import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import generateRssFeed from '@/lib/generateRss'
import { fetchRepos } from '@/lib/github'

import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { LatestGithubSection } from '@/components/LatestGithubSection'
import { LatestNotesSection } from '@/components/LatestNotesSection'
import { LatestPostsSection } from '@/components/LatestPostsSection'

import { routes } from '@/config/routes'
import { HERO_LINKS } from '@/constants'
import { getAllPostsWithFrontMatter } from '@/utils/get-articles-posts'

const PodcastSection = dynamic(() => import('../components/PodcastSection'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

type HomeProps = {
  articles: any[]
  notes: any[]
  ghProjects: any[]
}

const Home: NextPage<HomeProps> = ({ articles, notes, ghProjects }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).home.seo.title}
        description={routes(t).home.seo.description}
        titleTemplate="%s"
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://thedaviddias.dev',
          },
          {
            hrefLang: 'fr',
            href: 'https://thedaviddias.dev/fr',
          },
        ]}
        openGraph={routes(t).home.seo}
      />
      <main id="main" data-skip-link="main content">
        <section className="pb-20 pt-0 lg:pt-10 flex justify-evenly">
          <div className="text-left">
            <h1 className="block mb-4 dark:text-white transition-colors">
              <p className="text-3xl p-0 font-light uppercase">{t('home.hero.greetings1')}</p>
              <span className="text-5xl lg:text-6xl font-title font-medium leading-snug">
                {t('home.hero.greetings2')}
              </span>
            </h1>
            <div
              className="max-w-xl lg:px-0.5 text-base lg:text-lg sm:text-xl text-gray-500 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: t('home.hero.presentation') }}
            />
            <div className="flex justify-left mt-10 space-x-5">
              {HERO_LINKS.map(({ label, link, rel }) => (
                <CustomLink
                  href={link}
                  key={link}
                  rel={rel}
                  className="font-semibold dark:!text-white"
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

        <LatestGithubSection projects={ghProjects} />

        <LatestPostsSection articles={articles} />

        {process.env.NODE_ENV === 'production' && <PodcastSection />}
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const posts = await getAllPostsWithFrontMatter({ dataType: 'articles', locale, limit: 4 })
  const notes = await getAllPostsWithFrontMatter({ dataType: 'notes', locale, limit: 4 })
  const ghProjects = await fetchRepos('PUSHED_AT', 2)

  await generateRssFeed().then(null)

  const props: HomeProps = {
    articles: JSON.parse(JSON.stringify(posts)),
    notes: JSON.parse(JSON.stringify(notes)),
    ghProjects,
  }

  return {
    props,
  }
}

export default Home
