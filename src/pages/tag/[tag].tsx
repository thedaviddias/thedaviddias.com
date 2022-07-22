import type { NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/blog-post'
import { Container } from '@/components/container'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter, getTags } from '@/utils/get-blog-posts'

const TagPage: NextPage = ({ posts, tag }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).home.seo.title}
        description={routes(t).home.seo.description}
        openGraph={routes(t).home.seo.openGraph}
      />

      <div className="mx-auto space-y-20 divide-y divide-slate-200 sm:space-y-24 lg:max-w-none lg:space-y-32">
        <section className="grid grid-cols-1 gap-y-10 gap-x-6 pt-10">
          <h2 className="text-2xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white">
            Tag: <>{tag}</>
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <BlogPost posts={posts} />
          </div>
        </section>
        <section></section>
      </div>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const tags = await getTags('blog')

  const paths = tags.map((tag: string) => ({
    params: {
      tag,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const posts = await getAllPostsWithFrontMatter({ dataType: 'blog', filterByTag: params.tag })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      tag: params.tag,
    },
  }
}

export default TagPage
