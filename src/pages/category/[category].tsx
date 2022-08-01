import listCategories from 'data/categories.json'
import type { GetStaticProps, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/BlogPost'
import { PageHeader } from '@/components/PageHeader'

import { pages } from '@/config/routes'
import { CONTENT_TYPE } from '@/constants'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getAllPostsWithFrontMatter, getCategories } from '@/utils/get-articles-posts'

type CategoryPageProps = {
  posts: any[]
  category: {
    name: string
    description?: string
  }
}

const CategoryPage: NextPage<CategoryPageProps> = ({ posts, category }) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const titleCategory = category?.name || ''
  const descriptionCategory = category?.description || ''

  const titlePage = pages(t, titleCategory).category.title
  const descriptionPage = pages(t, descriptionCategory).category.description

  return (
    <BaseLayout title={titlePage} description={descriptionPage}>
      <PageHeader title={titlePage} description={descriptionPage} />

      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        {posts?.map((post) => (
          <BlogPost
            key={post.frontMatter.title}
            post={post}
            isCategoryPage={router.query?.category}
          />
        ))}
      </div>
    </BaseLayout>
  )
}

export const getStaticPaths = async () => {
  const categories = await getCategories(CONTENT_TYPE.ARTICLE)

  const paths = categories.map((category: string) => ({
    params: {
      category,
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
  const posts = await getAllPostsWithFrontMatter({
    dataType: CONTENT_TYPE.ARTICLE,
    locale,
    filterByCategory: params.category,
  })

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
