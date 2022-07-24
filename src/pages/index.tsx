import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/blog-post'
import { Container } from '@/components/container'
import { CustomLink } from '@/components/custom-link'
import { Newsletter } from '@/components/newsletter'

import { routes } from '@/config/routes'
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
        openGraph={routes(t).home.seo.openGraph}
      />

      <main className="mx-auto space-y-20 divide-y divide-slate-200 sm:space-y-24 lg:max-w-none lg:space-y-10">
        <section className="-mt-36 pb-8 pt-48 sm:pt-60 sm:pb-8 text-center relative block ">
          <h1 className="-mt-10 block text-6xl sm:text-7xl lg:text-8xl mb-4 serif:font-bold dark:text-white leading-tighter transition-colors">
            <p className="text-4xl p-0">HEY THERE!</p>
            <span className="text-6xl">I'm David Dias</span>
          </h1>
          <div className="max-w-xl lg:px-0.5 mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400 -mt-1">
            I like solving digital and human problems! I spend most of my time coding using modern
            HTML, CSS, and Javascript. Outside of work, I enjoy meeting new people, building
            communities and producing multimedia content.
          </div>

          <div className="flex justify-center mt-10 space-x-5">
            <CustomLink href="https://changelog.thedaviddias.dev">Personal changelog</CustomLink>
            <CustomLink href="https://changelog.thedaviddias.dev">Twitter</CustomLink>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-y-10 border-none">
          <header>
            <h2 className="text-2xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white">
              Lastest blog posts
            </h2>
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
        <section className="border-none">
          <Newsletter />
        </section>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const posts = getAllPostsWithFrontMatter({ dataType: 'blog', locale, limit: 4 })

  const props: HomeProps = {
    posts: JSON.parse(JSON.stringify(posts)),
  }

  return {
    props,
  }
}

export default Home
