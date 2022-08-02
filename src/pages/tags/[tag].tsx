import type { GetStaticProps, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/BlogPost'
import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { Notes } from '@/components/Notes'
import { PageHeader } from '@/components/PageHeader'

import { pages } from '@/config/routes'
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
    <Container>
      <NextSeo title={titlePage} description={descriptionPage} />
      <main className="mx-auto space-y-20 divide-y divide-slate-200 sm:space-y-16 lg:max-w-none lg:space-y-32">
        <section className="grid grid-cols-1 gap-y-10 gap-x-6 lg:pt-10">
          <PageHeader
            title={pages(t, tag).tag.h1}
            description={t('tags.seo.description', { name: tag })}
          />

          <h2 className="sr-only">{t('tags.latest_posts', { name: tag })}</h2>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {posts?.map((post, i) => (
              <>
                {post.frontMatter.type === 'article' && (
                  <BlogPost key={`${i}-article`} post={post} />
                )}

                {post.frontMatter.type === 'note' && <Notes key={`${i}-note`} note={post} />}
              </>
            ))}
          </div>
          {posts?.length ? (
            <footer className="text-right">
              <CustomLink href={t('tags.path')}>{t('tags.view_all_tags')}</CustomLink>
            </footer>
          ) : null}
        </section>
      </main>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const tags = await getTags('articles')
  const notes = await getTags('notes')

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
  const posts =
    (await getAllPostsWithFrontMatter({
      dataType: 'articles',
      filterByTag: params.tag,
      locale,
    })) || {}
  const notes =
    (await getAllPostsWithFrontMatter({
      dataType: 'notes',
      filterByTag: params.tag,
      locale,
    })) || {}

  return {
    props: {
      posts: JSON.parse(JSON.stringify([...posts, ...notes])),
      tag: params.tag,
    },
  }
}

export default TagPage
