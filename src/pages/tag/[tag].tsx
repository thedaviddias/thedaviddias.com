import type { GetStaticProps, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/BlogPost'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'

import { pages } from '@/config/routes'
import { getAllPostsWithFrontMatter, getTags } from '@/utils/get-blog-posts'

type CategoryPageProps = {
  posts: any[]
  tag: string
}

const TagPage: NextPage<CategoryPageProps> = ({ posts, tag }) => {
  const { t } = useTranslation('common')

  const titlePage = pages(t, tag).tag.title
  const descriptionPage = pages(t, tag).tag.description

  return (
    <Container>
      <NextSeo title={titlePage} description={descriptionPage} />
      <main className="mx-auto space-y-20 divide-y divide-slate-200 sm:space-y-16 lg:max-w-none lg:space-y-32">
        <section className="grid grid-cols-1 gap-y-10 gap-x-6 pt-10">
          <PageHeader
            title={titlePage}
            description={`All my articles related to the ${tag} topic.`}
          />

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {posts?.map((post) => (
              <BlogPost key={post.frontMatter.title} post={post} />
            ))}
          </div>
        </section>
      </main>
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

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }: Params) => {
  const posts = await getAllPostsWithFrontMatter({ dataType: 'blog', filterByTag: params.tag })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      tag: params.tag,
    },
  }
}

export default TagPage
