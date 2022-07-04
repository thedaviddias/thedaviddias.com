import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/blog-post'
import { Container } from '@/components/container'

import { routes } from '@/config/routes'
import { getBlogsInformation } from '@/utils/get-blog-posts'

import type { BlogPost as BlogPostTypes } from '@/types/blog-post'

type Props = {
  posts: BlogPostTypes[]
}

const Home: NextPage = ({ posts }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).home.seo.title}
        description={routes(t).home.seo.description}
        openGraph={routes(t).home.seo.openGraph}
      />

      <div className="mx-auto max-w-[40rem] space-y-20 divide-y divide-slate-200 sm:space-y-24 lg:max-w-none lg:space-y-32">
        <section className="grid grid-cols-1 gap-y-10 gap-x-6 pt-10">
          <h2 className="text-2xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white">
            Articles
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <BlogPost posts={posts} />
          </div>
        </section>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const posts = getBlogsInformation(6, locale)

  const props: Props = {
    posts,
  }

  return {
    props,
  }
}

export default Home
