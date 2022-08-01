import type { GetStaticProps, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/BlogPost'
import { Notes } from '@/components/Notes'
import { PageHeader } from '@/components/PageHeader'

import { pages } from '@/config/routes'
import { CONTENT_TYPE } from '@/constants'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getAllPostsWithFrontMatter, getTags } from '@/utils/get-articles-posts'

type CategoryPageProps = {
  posts: any[]
  tag: string
}

const TagPage: NextPage<CategoryPageProps> = ({ posts, tag }) => {
  const { t } = useTranslation('common')

  const titlePage = pages(t, tag).tag.title
  const descriptionPage = pages(t, tag).tag.description

  return (
    <BaseLayout title={titlePage} description={descriptionPage}>
      <PageHeader
        title={pages(t, tag).tag.h1}
        description={t('tags.seo.description', { name: tag })}
      />

      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        {posts?.map((post) => (
          <>
            <>
              {post.frontMatter.type === 'article' && (
                <BlogPost key={post.frontMatter.title} post={post} />
              )}
            </>
            <>
              {post.frontMatter.type === 'note' && (
                <Notes key={post.frontMatter.title} note={post} />
              )}
            </>
          </>
        ))}
      </div>
    </BaseLayout>
  )
}

export const getStaticPaths = async () => {
  const tags = await getTags(CONTENT_TYPE.ARTICLE)
  const notes = await getTags(CONTENT_TYPE.NOTE)

  const paths = [...tags, ...notes].map((tag: string) => ({
    params: {
      tag,
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
    filterByTag: params.tag,
    locale,
  })
  const notes = await getAllPostsWithFrontMatter({
    dataType: CONTENT_TYPE.NOTE,
    filterByTag: params.tag,
    locale,
  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify([...posts, ...notes])),
      tag: params.tag,
    },
  }
}

export default TagPage
