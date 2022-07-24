import categories from 'data/categories.json'
import type { GetStaticProps, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/BlogPost'
import { Container } from '@/components/Container'
import { H1 } from '@/components/Heading'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter, getCategories } from '@/utils/get-blog-posts'

import { BlogPostProps } from '../blog/[slug]'

type CategoryPageProps = {
  posts: BlogPostProps[]
  category: {
    name: string
    description: string
  }
}

const CategoryPage = ({ posts, category }: CategoryPageProps) => {
  const { t } = useTranslation('common')
  const { name, description } = category
  const router = useRouter()

  return (
    <Container>
      <NextSeo title={routes(t).home.seo.title} description={description} />

      <main className="mx-auto space-y-20 divide-y divide-slate-200 sm:space-y-16 lg:max-w-none lg:space-y-32">
        <section className="grid grid-cols-1 gap-y-10 gap-x-6 pt-10">
          <header>
            <H1>
              Category: <>{name}</>
            </H1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
              {description}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {posts?.map((post) => (
              <BlogPost
                key={post.frontMatter.title}
                post={post}
                isCategoryPage={router.query?.category}
              />
            ))}
          </div>
        </section>
        <section></section>
      </main>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const categories = await getCategories('blog')

  const paths = categories.map((category: string) => ({
    params: {
      category,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }: Params) => {
  const posts = await getAllPostsWithFrontMatter({
    dataType: 'blog',
    filterByCategory: params.category,
  })

  const currentCategory = Object.values(categories).find((el) => el.id === params.category)

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      category: {
        name: params.category,
        ...currentCategory,
      },
    },
  }
}

export default CategoryPage
