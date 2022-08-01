import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { BlogPost } from '@/components/BlogPost'
import { CategoriesList } from '@/components/CategoriesList'
import { Container } from '@/components/Container'
import { H1, H3, H4, H5 } from '@/components/Headings'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter, getCategories } from '@/utils/get-articles-posts'

type BlogProps = {
  posts: any[]
  categories: any[]
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
      />
      <main className="divide-slate-200 sm:space-y-16 lg:max-w-none">
        <section className="pt-10 border-none">
          <header>
            <H1>{routes(t).articles.seo.title}</H1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
              {routes(t).articles.seo.description}
            </p>
          </header>
        </section>
        <section className="border-none">
          <header>
            <h2 className="sr-only">Recent articles</h2>
          </header>

          <H3 as="h2">Access articles by categories</H3>
          <CategoriesList categories={categories} />

          <form className="relative w-full mb-4">
            <fieldset>
              <H4 as="legend">Search by keyword</H4>
              <input
                aria-label="Search articles"
                type="search"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Type a word to search through the articles"
                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </fieldset>
          </form>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2 mt-16">
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
