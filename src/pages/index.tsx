import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/BlogPost'
import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { H5 } from '@/components/Heading'

import { routes } from '@/config/routes'
import { HERO_LINKS } from '@/constants'
import { getAllPostsWithFrontMatter } from '@/utils/get-blog-posts'

import { BlogPost as BlogPostComponent } from './blog/[slug]'

type HomeProps = {
  posts: BlogPostComponent[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).home.seo.title}
        description={routes(t).home.seo.description}
        titleTemplate="%s"
        openGraph={routes(t).home.seo.openGraph}
      />

      <main>
        <section className="pb-20 pt-0 lg:pt-10 relative flex justify-evenly">
          <div className="text-left">
            <h1 className="block mb-4 dark:text-white transition-colors">
              <p className="text-3xl p-0 font-light uppercase">{t('hero.greetings1')}</p>
              <span className="text-5xl lg:text-6xl font-title font-medium leading-snug">
                {t('hero.greetings2')}
              </span>
            </h1>
            <div className="max-w-xl lg:px-0.5 text-base lg:text-lg sm:text-xl text-gray-500 dark:text-gray-400">
              {t('hero.presentation')}
            </div>

            <div className="flex justify-left mt-10 space-x-5">
              {HERO_LINKS.map(({ label, link }) => (
                <CustomLink href={link} passHref key={link} className="font-semibold">
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

        <section className="grid grid-cols-1 gap-y-10 border-none">
          <header>
            <H5 as="h2">{t('blog.latest-posts')}</H5>
          </header>
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {posts.map((post) => (
              <BlogPost key={post.frontMatter.title} post={post} />
            ))}
          </div>
          <footer className="text-right">
            <CustomLink href="/blog">{t('posts.viewAll')}</CustomLink>
          </footer>
        </section>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const posts = getAllPostsWithFrontMatter({ dataType: 'blog', locale, limit: 3 })

  const props: HomeProps = {
    posts: JSON.parse(JSON.stringify(posts)),
  }

  return {
    props,
  }
}

export default Home
