import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/blog-post'
import { Container } from '@/components/container'
import { H1 } from '@/components/heading'
import { Newsletter } from '@/components/newsletter'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter } from '@/utils/get-blog-posts'

import type { BlogPost as BlogPostTypes } from '@/types/blog-post'

const Blog = ({ posts }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).blog.seo.title}
        description={routes(t).blog.seo.description}
        openGraph={routes(t).blog.seo.openGraph}
      />
      <main className="divide-slate-200 sm:space-y-24 lg:max-w-none">
        <section className="pt-10 border-none">
          <header>
            <H1>{routes(t).blog.seo.title}</H1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
              {routes(t).blog.seo.description}
            </p>
          </header>
        </section>
        <section className="border-none">
          <header>
            <h2 className="sr-only">Recent articles</h2>
          </header>
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <BlogPost posts={posts} />
          </div>
        </section>
        <Newsletter />
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const posts = getAllPostsWithFrontMatter({ dataType: 'blog', locale })

  const props: HomeProps = {
    posts: JSON.parse(JSON.stringify(posts)),
  }

  return {
    props,
  }
}

export default Blog
