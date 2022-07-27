import type { GetStaticProps, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { NextSeo } from 'next-seo'

import { BlogPost } from '@/components/BlogPost'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'

import { getAllPostsWithFrontMatter, getTags } from '@/utils/get-blog-posts'



type CategoryPageProps = {
  posts: any[]
  tag: string
}

const TagPage: NextPage<CategoryPageProps> = ({ posts, tag }) => {
  const title = `Tag: ${tag}`

  return (
    <Container>
      <NextSeo title={title} />
      <main className="mx-auto space-y-20 divide-y divide-slate-200 sm:space-y-16 lg:max-w-none lg:space-y-32">
        <PageHeader title={title} description={`All my articles related to the ${tag} topic.`} />
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          {posts?.map((post) => (
            <BlogPost key={post.frontMatter.title} post={post} />
          ))}
        </div>
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
