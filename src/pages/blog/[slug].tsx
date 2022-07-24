import { format } from 'date-fns'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeImgSize from 'rehype-img-size'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import slugify from 'slugify'

import { Container } from '@/components/container'
import { CustomLink } from '@/components/custom-link'
import { H1 } from '@/components/heading'
import { MDXComponents } from '@/components/mdx-components'
import { Newsletter } from '@/components/newsletter'
import { TableOfContents } from '@/components/table-of-contents/table-of-contents'

import { routes } from '@/config/routes'
import seo from '@/config/seo'
import { getAllPosts, getPost, readBlogPost } from '@/utils/get-blog-posts'
import rehypeExtractHeadings from '@/utils/rehype-extract-headings'

export type BlogPost = {
  frontMatter: {
    author?: string
    categories: string[]
    date: string
    description: string
    lastmod?: string
    locale: string
    permalink: string
    tags?: string[]
    title: string
    preview: string
  }
  slug: string
}

export type Headings = {
  id: string
  title: string
}

type Props = BlogPost & {
  source: MDXRemoteSerializeResult
  readingTime: string
  headings: Headings[]
}

const BlogPostPage = ({ frontMatter, source, headings }: Props) => {
  const { title, description, tags, categories, date, lastmod, permalink, author, preview } =
    frontMatter
  const { isFallback } = useRouter()
  const { t } = useTranslation('common')

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
          url: permalink,
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: lastmod,
            authors: ['https://www.example.com/authors/@firstnameA-lastnameA'],
            tags,
          },
          images: [
            {
              url: `${seo}/images/${preview}`,
              width: 850,
              height: 650,
              alt: '',
            },
          ],
        }}
      />
      <main>
        <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="pb-6 text-center border-b border-gray-200 dark:border-gray-700 mb-8 transition-colors duration-200">
            {categories && (
              <div className="text-gray-500 dark:text-gray-400 font-medium mb-2 text-sm sm:text-base transition-colors duration-200">
                <span className="sr-only">Category</span>
                {categories.map((category) => (
                  <CustomLink
                    key={category}
                    href={`/category/${slugify(category, { lower: true })}`}
                    passHref
                    className="block mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x !font-semibold"
                  >
                    {category}
                  </CustomLink>
                ))}
              </div>
            )}
            <H1>
              <span className="block mt-1.5 mb-6 serif:mt-2 text-black dark:text-white leading-none transition-colors duration-200 ">
                {title}
              </span>
              <span className="sr-only"> — </span>
              <div className="font-body text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-3 mb-6 tracking-wide font-light">
                {description}
              </div>
            </H1>

            <div className="flex justify-between">
              {author && (
                <aside className="flex items-center justify-center font-sans">
                  <div className="flex-shrink-0 group block">
                    <CustomLink href={routes(t).about.path}>
                      <div className="flex items-center">
                        <div>
                          <Image
                            className="inline-block h-9 w-9 rounded-full"
                            src="/images/david-dias-round.png"
                            width={50}
                            height={50}
                            alt="Profile avatar of David Dias"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3 text-left">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {author}
                          </p>
                          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                            About me
                          </p>
                        </div>
                      </div>
                    </CustomLink>
                  </div>
                </aside>
              )}
              <div className="flex items-center justify-center font-sans">
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    <time dateTime={date}>{format(new Date(date), 'MMM dd, yyyy')}</time>{' '}
                  </p>
                  {lastmod && (
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      <span className="sr-only">Article updated on</span>
                      <time dateTime={lastmod}>({format(new Date(lastmod), 'MMM dd, yyyy')})</time>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </header>
          <div className="block lg:flex w-full">
            <div className="max-w-full">
              <div className="  w-[40em] lg:w-[37rem] !max-w-full">
                <section className="prose prose-sm sm:prose dark:prose-invert prose-img:rounded-xl serif:prose-serif !max-w-full mb-10">
                  <MDXRemote {...source} components={MDXComponents} />
                </section>
                {tags && (
                  <aside className="w-full mt-3 print:hidden">
                    <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 text-sm">
                      Tags
                    </div>
                    <nav>
                      <ul className="flex items-center space-x-5">
                        {tags.map((tag) => (
                          <li key={tag} className="border border-gray-200 rounded-md px-2 py-1">
                            <CustomLink
                              className="block mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                              href={`/tag/${slugify(tag, { lower: true })}`}
                            >
                              {tag}
                            </CustomLink>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </aside>
                )}
              </div>
            </div>

            <div className="flex-auto ml-16 hidden lg:block">
              <div className="sticky top-10 w-full">
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
      </main>
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
    const headings: Headings[] = []

    const {
      content,
      data: { title, description, tags, date, categories, lastmod, author },
    } = matter(postContent)

    return {
      props: {
        frontMatter: {
          title,
          description,
          date: JSON.parse(JSON.stringify(date)),
          tags,
          categories: categories || null,
          lastmod: lastmod || null,
          author: author || null,
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
