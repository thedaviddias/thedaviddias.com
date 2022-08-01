import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { BlogPost } from '@/components/BlogPost'
import { Categories } from '@/components/Categories'
import { Container } from '@/components/Container'
import { H3 } from '@/components/Headings'
import { PageHeader } from '@/components/PageHeader'
import { Search } from '@/components/Search'

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
          <PageHeader
            title={routes(t).articles.h1}
            description={routes(t).articles.seo.description}
          />
        </section>

        <section className="border-none">
          <H3 as="h2">{t('articles.sections.category_filter')}</H3>
          <Categories categories={categories} />

          <Search setSearchValue={setSearchValue} />

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
