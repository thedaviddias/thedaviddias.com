import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { ReadTimeResults } from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeImagePlaceholder from 'rehype-image-placeholder'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import slugify from 'slugify'

import { AdjacentPosts, PreviousNext } from '@/components/AdjacentPosts'
import { Author } from '@/components/Author'
import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { DatePost } from '@/components/DatePost'
import { H1 } from '@/components/Headings'
import { MDXComponents } from '@/components/MdxComponents'
import { Paragraph } from '@/components/ParagraphPost'
import { ScrollTop } from '@/components/ScrollTop'
import { Share } from '@/components/Share'
import { TableOfContents } from '@/components/TableOfContents/TableOfContents'
import { Tags } from '@/components/Tags'

import { routes } from '@/config/routes'
import { baseUrl } from '@/config/seo'
import { getAdjacentPosts, getAllPosts, getPost, getPostBySlug } from '@/utils/get-blog-posts'
import { rehypeExtractHeadings } from '@/utils/rehype-extract-headings'
import { remarkCodeTitles } from '@/utils/remark-code-titles'

export type BlogPostProps = {
  frontMatter: {
    draft: boolean
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
    published?: {
      publishedOn: string
      publishedUrl: string
    }
  }
  permalink: string
  slug: string
}

export type Headings = {
  id: string
  title: string
}

type BlogPostPageProps = BlogPostProps & {
  source: MDXRemoteSerializeResult
  readingTime: ReadTimeResults
  headings: Headings[]
  adjacentPosts: PreviousNext
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({
  frontMatter,
  source,
  headings,
  permalink,
  adjacentPosts,
}) => {
  const { title, description, tags, categories, date, lastmod, author, preview, published } =
    frontMatter
  const { isFallback } = useRouter()
  const { t } = useTranslation('common')

  if (isFallback || !title) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <ScrollTop />
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
              url: `${baseUrl}/images/${preview}`,
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
                    className="mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x !font-semibold transition-colors duration-200"
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
              {author && <Author name={author} routes={routes} />}

              {date && <DatePost date={date} lastmod={lastmod} />}
            </div>
          </header>
          <div className="block lg:flex w-full">
            <div className="max-w-full">
              <div className=" w-[40em] lg:w-[37rem] !max-w-full">
                <section className="prose prose-sm sm:prose dark:prose-invert prose-img:rounded-xl !max-w-full mb-10">
                  <MDXRemote {...source} components={MDXComponents} lazy />

                  {published?.publishedUrl && (
                    <Paragraph className="italic pt-8">
                      {t('posts.published')}{' '}
                      <CustomLink href={published.publishedUrl} as="span">
                        {published.publishedOn}
                      </CustomLink>
                    </Paragraph>
                  )}
                </section>

                {tags && <Tags tags={tags} />}

                {adjacentPosts && <AdjacentPosts posts={adjacentPosts} />}
              </div>
            </div>

            <div className="flex-auto ml-16 hidden lg:block print:hidden">
              <div className="sticky top-10 w-full">
                {permalink && <Share title={title} tags={tags && tags} slug={permalink} />}
                {headings && (
                  <aside className="w-full mt-3">
                    <TableOfContents items={headings} />
                  </aside>
                )}
              </div>
            </div>
          </div>
        </article>
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

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  if (params?.slug) {
    const slug = params.slug as string
    const postContent = await getPostBySlug(slug, 'blog')
    const headings: Headings[] = []

    const {
      markdownBody,
      frontMatter: {
        title,
        description,
        tags,
        date,
        categories,
        lastmod,
        author,
        publishedOn,
        publishedUrl,
      },
      permalink,
      readingTime,
    } = postContent

    return {
      props: {
        frontMatter: {
          title,
          description,
          date: JSON.parse(JSON.stringify(date)),
          tags,
          categories: categories || null,
          lastmod: (lastmod && JSON.parse(JSON.stringify(lastmod))) || null,
          author: author || null,
          ...(publishedOn && {
            published: {
              publishedOn,
              publishedUrl,
            },
          }),
        },
        permalink,
        slug,
        readingTime,
        headings,
        adjacentPosts: getAdjacentPosts(slug),
        source: await serialize(markdownBody, {
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkCodeTitles],
            rehypePlugins: [
              [rehypePrismPlus, { ignoreMissing: true }],
              [rehypeImagePlaceholder, { dir: 'public/' }],
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
