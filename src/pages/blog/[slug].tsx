import { format } from 'date-fns'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeImgSize from 'rehype-img-size'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import slugify from 'slugify'

import { Container } from '@/components/container'
import { H1 } from '@/components/heading'
import { MDXComponents } from '@/components/mdx-components'
import { Newsletter } from '@/components/newsletter'
import { TableOfContents } from '@/components/table-of-contents/table-of-contents'

import { getAllPosts, getPost } from '@/utils/get-blog-posts'
import { readBlogPost } from '@/utils/read-blog-post'
import rehypeExtractHeadings from '@/utils/rehype-extract-headings'

import { BlogPost } from '@/types/blog-post'

type Props = BlogPost & {
  source: MDXRemoteSerializeResult
  readingTime: string
  headings: any
}

const BlogPostPage = ({ frontMatter, source, headings, readingTime }: Props) => {
  const { title, description, tags, categories, date, lastmod } = frontMatter
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
                {tags && (
                  <aside className="w-full mt-3 print:hidden">
                    <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 text-sm">
                      Tags
                    </div>
                    <nav className="tag-list">
                      <ul>
                        {tags.map((tag) => (
                          <li key={tag}>
                            <Link
                              className="block mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                              href={`/tag/${slugify(tag, { lower: true })}`}
                            >
                              {tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </aside>
                )}
              </section>
            </div>
          </div>

          <div className="flex-auto ml-16 hidden lg:block">
            <div className="sticky top-24 w-full">
              <aside className="w-full">
                <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 text-sm">
                  Author
                </div>
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="inline-block h-9 w-9 rounded-full"
                        src="/images/david-dias-round.png"
                        width={50}
                        height={50}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        David Dias
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </aside>

              {categories && (
                <aside className="w-full mt-3">
                  <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 text-sm">
                    Category
                  </div>
                  <nav className="tag-list">
                    <ul>
                      {categories.map((category) => (
                        <li key={category}>
                          <Link
                            className="block mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            href={`/category/${slugify(category, { lower: true })}`}
                          >
                            {category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </aside>
              )}

              <aside className="w-full mt-3">
                <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 text-sm">
                  Reading time
                </div>
                {readingTime}
              </aside>

              {headings && (
                <aside className="w-full mt-3">
                  <TableOfContents items={headings} />
                </aside>
              )}
            </div>
          </div>
        </div>
      </article>
      <Newsletter />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = getAllPosts('blog')

  const paths: GetStaticPathsResult['paths'] = []
  blogs.forEach((blog) => {
    const slug = blog.replace(/\.mdx/, '')
    const source = getPost(slug, 'blog')

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
      data: { title, description, tags, date, categories, lastmod },
    } = matter(postContent)

    const headings = []

    return {
      props: {
        frontMatter: {
          title,
          description,
          date: JSON.parse(JSON.stringify(date)),
          tags,
          categories: categories || null,
          lastmod: lastmod || null,
        },
        readingTime: readingTime(content).text,
        headings,
        source: await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [rehypeImgSize, { dir: 'public/' }],
              rehypeSlug,
              [rehypeAutolinkHeadings],
              [rehypeExtractHeadings, { rank: 2, headings }],
            ],
          },
        }),
      },
    }
  }
  return {
    notFound: true,
  }
}

export default BlogPostPage
