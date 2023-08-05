import humanizeString from 'humanize-string'
import type { GetStaticProps, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/BlogPost'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'

import { pages } from '@/config/routes'
import { CONTENT_TYPE } from '@/constants'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'
import { getCategories } from '@/utils/get-article-posts/getCategories'

import listCategories from '../../../../../data/categories.json'

import { ArticlesType } from '@/types'

type CategoryPageProps = {
  posts: ArticlesType[]
  category: {
    name: string
    description?: string
  }
}

const CategoryPage: NextPage<CategoryPageProps> = ({ posts, category }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const titleCategory = category?.name || ''
  const descriptionCategory = category?.description || category?.name

  const titlePage = humanizeString(pages(t, titleCategory).category.title)
  const descriptionPage = pages(t, descriptionCategory).category.description

  return (
    <Container>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <NextSeo title={titlePage} description={descriptionPage} />
      <main className="mx-auto space-y-20 divide-y divide-slate-200 sm:space-y-16 lg:max-w-none lg:space-y-32">
        <section className="grid grid-cols-1 gap-y-10 gap-x-6 lg:pt-10">
          <PageHeader title={titlePage} description={descriptionPage} />

          <div className="grid grid-cols-1 lg:col-span-2">
            {posts?.map((post) => (
              <BlogPost
                key={post.frontMatter.title}
                post={post}
                isCategoryPage={router.query?.category}
              />
            ))}
          </div>
        </section>
      </main>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const categories = await getCategories(CONTENT_TYPE.ARTICLE)

  const paths = categories.map((category) => ({
    params: {
      category: category.name,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
  locale,
}: Params) => {
  const posts =
    locale &&
    (await getAllPostsWithFrontMatter({
      dataType: CONTENT_TYPE.ARTICLE,
      locale,
      filterByCategory: params.category,
    }))

  const currentCategory = Object.values(listCategories).find((cat) => cat.id === params.category)

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      category: {
        name: params?.category,
        ...currentCategory,
      },
    },
  }
}

export default CategoryPage
