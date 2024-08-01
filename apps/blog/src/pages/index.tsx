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
import { LatestProjectsSection } from '@/components/LatestProjectsSection/LatestProjectsSection'
import { Loader } from '@/components/Loader'
import { SubstackFeed } from '@/components/SubstackFeed'
import { ToRead } from '@/components/ToRead'

import { routes } from '@/config/routes'
import { HERO_LINKS } from '@/constants'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'
import { listSocialUrl } from '@/utils/list-social-url'
import { readData } from '@/utils/read-data'

import { LatestGithubSectionProps } from '../components/LatestGithubSection'
import social from '../../../../data/social.json'

import { ArticlesType, NotesType, ProjectsType, YouTubeVideo } from '@/types'

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
  projects: ProjectsType[]
  fallback: {
    '/api/youtube/videos': YouTubeVideo[]
  }
}

const Home: NextPage<HomeProps> = ({ articles, notes, ghProjects, fallback, projects }) => {
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
              href: 'https://thedaviddias.com',
            },
            {
              hrefLang: 'fr',
              href: 'https://thedaviddias.com/fr',
            },
          ]}
          openGraph={routes(t).home.seo}
        />
        <SocialProfileJsonLd
          type="Person"
          name="David Dias"
          url="https://thedavidias.com"
          sameAs={listSocialUrl(social)}
        />
        <main id="main" data-skip-link="main content">
          <section className="flex justify-between pb-10 pt-0 md:pb-20">
            <div className="text-left">
              <h1 className="mb-4 block transition-colors dark:text-white">
                <span className="block p-0 text-3xl font-light uppercase">
                  {t('home.hero.greetings1')}
                </span>
                <span className="font-title text-5xl font-medium leading-snug lg:text-6xl">
                  {t('home.hero.greetings2')}
                </span>
              </h1>
              <div
                className="max-w-xl text-base text-gray-500 sm:text-xl lg:px-0.5 lg:text-lg dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: t('home.hero.presentation') }}
              />
              <div className="justify-left mt-10 flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
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
                className="h-60 w-60 rounded-full"
                src="/images/david-dias-round.jpg"
                width={250}
                height={250}
                alt="Photo of David Dias in black and white"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </section>

          <LatestPostsSection articles={articles} />

          <section className="mb-10">
            <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
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

          <LatestNotesSection notes={notes} />

          <SubstackFeed />

          <LatestProjectsSection projects={projects} />

          <LatestGithubSection projects={ghProjects} />

          {process.env.NODE_ENV === 'production' && !mobile() && <PodcastSection />}

          {process.env.NODE_ENV === 'production' && <LatestYoutubeVideos />}
        </main>
      </Container>
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const posts = await getAllPostsWithFrontMatter({ dataType: 'articles', locale, limit: 5 })
  const notes = await getAllPostsWithFrontMatter({ dataType: 'notes', locale, limit: 6 })
  const projects = await getAllPostsWithFrontMatter({ dataType: 'projects', locale, limit: 6 })
  const youtubeVideos = await readData<YouTubeVideo[]>('../../data/youtube.json')
  const ghProjects = await fetchRepos('PUSHED_AT', 4)

  await generateRssFeed().then(null)

  const props: HomeProps = {
    articles: JSON.parse(JSON.stringify(posts)),
    notes: JSON.parse(JSON.stringify(notes)),
    projects: JSON.parse(JSON.stringify(projects)),
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
