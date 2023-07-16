import social from 'data/social.json'
import mobile from 'is-mobile'
import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { SWRConfig } from 'swr'

import generateRssFeed from '@/lib/generateRss'
import { fetchRepos, GhProjectsProps } from '@/lib/github'

import { Container } from '@/components/Container'
import { CurrentlyReading } from '@/components/CurrentlyReading'
import { CustomLink } from '@/components/CustomLink'
import { LatestNotesSection } from '@/components/LatestNotesSection'
import { LatestPostsSection } from '@/components/LatestPostsSection'
import { Loader } from '@/components/Loader'
import { ToRead } from '@/components/ToRead'

import { routes } from '@/config/routes'
import { HERO_LINKS } from '@/constants'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'
import { listSocialUrl } from '@/utils/list-social-url'
import { readData } from '@/utils/read-data'

import { LatestGithubSectionProps } from '../components/LatestGithubSection'

import { ArticlesType, NotesType, YouTubeVideo } from '@/types'

const LatestGithubSection = dynamic<LatestGithubSectionProps>(
  () => import('../components/LatestGithubSection').then((mod) => mod.LatestGithubSection),
  {
    loading: () => <Loader />,
  }
)

const LatestYoutubeVideos = dynamic(
  () => import('../components/LatestYoutubeVideos/LatestYoutubeVideos'),
  {
    loading: () => <Loader />,
  }
)

const PodcastSection = dynamic(() => import('../components/PodcastSection'), {
  loading: () => <Loader />,
})

type HomeProps = {
  articles: ArticlesType[]
  notes: NotesType[]
  ghProjects: GhProjectsProps[]
  fallback: {
    '/api/youtube/videos': YouTubeVideo[]
  }
}

const Home: NextPage<HomeProps> = ({ articles, notes, ghProjects, fallback }) => {
  const { t } = useTranslation('common')

  return (
    <SWRConfig value={{ fallback }}>
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
        <SocialProfileJsonLd
          type="Person"
          name="David Dias"
          url="https://thedavidias.dev"
          sameAs={listSocialUrl(social)}
        />
        <main id="main" data-skip-link="main content">
          <section className="pb-10 md:pb-20 pt-0 flex justify-between">
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
                className="rounded-full w-60 h-60"
                src="/images/david-dias-round.jpg"
                width={250}
                height={250}
                alt="Photo of David Dias"
                priority={true}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </section>

          <LatestPostsSection articles={articles} />

          <LatestNotesSection notes={notes} />

          <LatestGithubSection projects={ghProjects} />

          {process.env.NODE_ENV === 'production' && !mobile() && <PodcastSection />}

          <section className="mb-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-5xl">
              <CurrentlyReading limit={mobile() ? 2 : 3} />
              <ToRead limit={mobile() ? 2 : 3} />
            </div>
            <footer className="text-right">
              <CustomLink
                href="https://www.goodreads.com/user/show/60055286-david-dias"
                className="dark:text-white"
              >
                {t('books.sections.viewAll')}
              </CustomLink>
            </footer>
          </section>

          {process.env.NODE_ENV === 'production' && <LatestYoutubeVideos />}
        </main>
      </Container>
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const posts = await getAllPostsWithFrontMatter({ dataType: 'articles', locale, limit: 4 })
  const notes = await getAllPostsWithFrontMatter({ dataType: 'notes', locale, limit: 4 })
  const youtubeVideos = await readData<YouTubeVideo[]>('data/youtube.json')
  const ghProjects = await fetchRepos('PUSHED_AT', 2)

  await generateRssFeed().then(null)

  const props: HomeProps = {
    articles: JSON.parse(JSON.stringify(posts)),
    notes: JSON.parse(JSON.stringify(notes)),
    ghProjects,
    fallback: {
      '/api/youtube/videos': youtubeVideos,
    },
  }

  return {
    props,
  }
}

export default Home
