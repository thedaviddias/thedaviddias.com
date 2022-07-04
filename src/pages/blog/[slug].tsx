import { format } from 'date-fns'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import readingTime from 'reading-time'
import slugify from 'slugify'

import { Container } from '@/components/container'
import { H1 } from '@/components/heading'
import { MDXComponents } from '@/components/mdx-components'

import { getBlogBySlug, getBlogs } from '@/utils/get-blog-posts'
import { readBlogPost } from '@/utils/read-blog-post'

import { BlogPost } from '@/types/blog-post'

type Props = BlogPost & {
  source: MDXRemoteSerializeResult
  readingTime: string
}

const BlogPostPage = ({ title, date, source, readingTime, tags, description, lastmod }: Props) => {
  const { isFallback } = useRouter()

  if (isFallback || !title) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <NextSeo
        title={title}
        openGraph={{
          title,
          description,
          url: 'https://www.example.com/articles/article-title',
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: '',
            authors: ['https://www.example.com/authors/@firstnameA-lastnameA'],
            tags,
          },
          images: [
            {
              url: '',
              width: 850,
              height: 650,
              alt: 'Photo of text',
            },
          ],
        }}
      />
      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="pb-10 text-center border-b border-gray-200 dark:border-gray-700 mb-8 transition-colors duration-200">
          <div className="text-gray-500 dark:text-gray-400 font-medium mb-2 text-sm sm:text-base transition-colors duration-200">
            <span className="sr-only">Article posted on</span>
            <time dateTime={date}>{format(new Date(date), 'eeee, dd MMMM yyyy')}</time>{' '}
            {lastmod && (
              <>
                <span className="sr-only">Article updated on</span>
                <time dateTime={lastmod}>({format(new Date(lastmod), 'eeee, dd MMMM yyyy')})</time>
              </>
            )}
          </div>
          <H1>
            <span className="pt-1.5 serif:mt-2 text-black dark:text-white mt-0 leading-none transition-colors duration-200 font-extrabold">
              {title}
            </span>
            <span className="sr-only"> — </span>
            <div className="font-medium text-lg sm:text-xl text-gray-500 dark:text-gray-400 mt-3">
              {description}
            </div>
          </H1>
        </header>
        <div className="block lg:flex w-full">
          <div className="max-w-full">
            <div className="  w-[40em] lg:w-[37rem] !max-w-full">
              <section className="prose prose-sm sm:prose dark:prose-light serif:prose-serif !max-w-full hide-first-paragraph">
                <MDXRemote {...source} components={MDXComponents} />
              </section>
            </div>
          </div>

          <div className="flex-auto ml-16 hidden lg:block">
            <div className="sticky top-24 w-full">
              <aside className="w-full">
                <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-sm">
                  Reading time
                </div>
                {readingTime}
              </aside>

              <aside className="w-full">
                <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-sm">
                  <a href="#top">Table of contents</a>
                </div>
                <nav className="table-of-contents max-h-[55vh] overflow-y-auto overflow-x-hidden">
                  <ul>
                    <li className="last:mb-0">
                      <a
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        href="#what-are-they"
                        data-title="h2"
                      >
                        What are they?
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>

              <div className="mt-6">
                <aside className="w-full">
                  <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 text-sm">
                    Tags
                  </div>
                  <nav className="tag-list">
                    <ul>
                      {tags.map((tag) => (
                        <li key={tag}>
                          <Link
                            className="block mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            href={`/tag/${slugify(tag)}`}
                          >
                            {tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = getBlogs()

  const paths: GetStaticPathsResult['paths'] = []
  blogs.forEach((blog) => {
    const slug = blog.replace(/\.mdx/, '')
    const source = getBlogBySlug(slug)
    const { data } = matter(source.trim())

    if (!data.draft) {
      paths.push({
        params: {
          slug,
        },
        locale: data.locale,
      })
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug) {
    const slug = params.slug as string
    const postContent = await readBlogPost(slug)

    const {
      content,
      data: { title, description, date, tags, lastmod },
    } = matter(postContent)

    return {
      props: {
        source: await serialize(content),
        title,
        description,
        date,
        readingTime: readingTime(content).text,
        slug,
        tags,
        lastmod: lastmod || null,
      },
    }
  }
  return {
    notFound: true,
  }
}

export default BlogPostPage
