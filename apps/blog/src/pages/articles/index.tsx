import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { BlogPostProps } from '@/components/BlogPost'
import { Categories } from '@/components/Categories'
import { Container } from '@/components/Container'
import { H3 } from '@/components/Headings'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { SearchProps } from '@/components/Search'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'
import { getCategories } from '@/utils/get-article-posts/getCategories'

import { ArticlesType, ListAllTags } from '@/types'

const Search = dynamic<SearchProps>(
  () => import('../../components/Search').then((mod) => mod.Search),
  {
    loading: () => <Loader />,
  }
)

const BlogPost = dynamic<BlogPostProps>(
  () => import('../../components/BlogPost').then((mod) => mod.BlogPost),
  {
    loading: () => <Loader />,
  }
)

type BlogProps = {
  posts: ArticlesType[]
  categories: ListAllTags[]
}

const Blog = ({ posts, categories }: BlogProps) => {
  const { t } = useTranslation('common')
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = posts.filter((post) =>
    post.frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Container>
      <NextSeo
        title={routes(t).articles.seo.title}
        description={routes(t).articles.seo.description}
        openGraph={routes(t).articles.seo}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://thedaviddias.com/articles',
          },
          {
            hrefLang: 'fr',
            href: 'https://thedaviddias.com/fr/articles',
          },
        ]}
      />
      <main className="divide-slate-200 sm:space-y-16 lg:max-w-none">
        <section className="grid grid-cols-1 border-none pt-10 md:items-end md:gap-4">
          <PageHeader
            title={routes(t).articles.h1}
            description={routes(t).articles.seo.description}
            className="col-span-4"
          />
          <div className="flex">
            <Search setSearchValue={setSearchValue} />
          </div>
        </section>

        <section className="border-none">
          <H3 as="h2">{t('articles.sections.category_filter')}</H3>

          <Categories categories={categories} />

          <div className="mt-16 grid grid-cols-1 lg:col-span-2">
            {!filteredBlogPosts.length && (
              <p className="mb-4 text-gray-600 dark:text-gray-400">{t('posts.empty')}</p>
            )}
            {filteredBlogPosts.map((post) => (
              <BlogPost key={post.frontMatter.title} post={post} />
            ))}
          </div>
        </section>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async ({ locale }) => {
  const posts = getAllPostsWithFrontMatter({ dataType: 'articles', locale })
  const categories = await getCategories('articles', locale)

  const props = {
    posts: JSON.parse(JSON.stringify(posts)),
    categories,
  }

  return {
    props,
  }
}

export default Blog
