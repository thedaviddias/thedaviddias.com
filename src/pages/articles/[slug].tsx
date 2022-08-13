import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { ReadTimeResults } from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeImagePlaceholder from 'rehype-image-placeholder'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import slugify from 'slugify'
import useSWR from 'swr'

import { AdjacentPosts } from '@/components/AdjacentPosts'
import { Author } from '@/components/Author'
import { Comments } from '@/components/Comments'
import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { DatePost } from '@/components/DatePost'
import { DisplayViews } from '@/components/DisplayViews'
import { H1 } from '@/components/Headings'
import { Loader } from '@/components/Loader'
import { MDXComponents } from '@/components/MdxComponents'
import { Paragraph } from '@/components/Paragraph'
import { RelatedPosts } from '@/components/RelatedPosts'
import { ScrollTop } from '@/components/ScrollTop'
import { Share } from '@/components/Share'
import { Subscribe } from '@/components/Subscribe'
import { TableOfContents } from '@/components/TableOfContents'
import { Tags } from '@/components/Tags'
import { Webmentions } from '@/components/Webmentions'

import { routes } from '@/config/routes'
import { CLOUDINARY_IMG_HEIGHT, CLOUDINARY_IMG_WIDTH } from '@/constants'
import fetcher from '@/utils/fetcher'
import { generateImageUrl } from '@/utils/generate-image-url'
import {
  getAdjacentPosts,
  getAllPosts,
  getPost,
  getPostBySlug,
  GetRelatedPosts,
  getRelatedPosts,
} from '@/utils/get-articles-posts'
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
    preview: {
      url: string
      alt: string
    }
    published?: {
      on: string
      url: string
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
  adjacentPosts: any
  relatedPosts: GetRelatedPosts[]
}

export type WebMention = {
  source: string
  verified: boolean
  verified_date: string
  private: boolean
  data: {
    author: {
      name: string
      url: string
      photo: string
    }
    url: string
    name: string | null
    content: string
    published: string
    published_ts: number
  }
  activity: {
    type: 'link' | 'reply' | 'repost' | 'like'
    sentence: string
    sentence_html: string
  }
  target: string
}

type WebMentionsResponse = {
  links: WebMention[]
}

const contentType = 'articles'

const BlogPostPage: NextPage<BlogPostPageProps> = ({
  frontMatter,
  source,
  headings,
  permalink,
  slug,
  adjacentPosts,
  relatedPosts,
}) => {
  const { title, description, tags, categories, date, lastmod, author, published } = frontMatter
  const { isFallback } = useRouter()
  const { t } = useTranslation('common')

  const { data } = useSWR<WebMentionsResponse>(
    `https://webmention.io/api/mentions.json?target=${permalink}`,
    fetcher
  )

  if (isFallback || !title) {
    return <Loader />
  }

  return (
    <Container>
      <ScrollTop />
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: permalink,
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: lastmod,
            authors: ['https://thedaviddias.dev/authors/@david-dias'],
            tags,
          },
          images: [
            {
              url: generateImageUrl({ title }),
              width: CLOUDINARY_IMG_WIDTH,
              height: CLOUDINARY_IMG_HEIGHT,
              alt: '',
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={permalink}
        title={title}
        images={[generateImageUrl({ title })]}
        datePublished={date}
        dateModified={lastmod}
        authorName="David Dias"
        description={description}
      />
      <main id="main" data-skip-link="the article">
        <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="pb-6 text-center border-b border-gray-200 dark:border-gray-700 mb-8 transition-colors duration-200">
            {categories.length && (
              <div className="text-gray-500 dark:text-gray-400 font-medium mb-2 text-sm sm:text-base transition-colors duration-200">
                <span className="sr-only">Category</span>
                {categories?.map((category) => (
                  <CustomLink
                    key={category}
                    href={`${t('category.path')}/${slugify(category, { lower: true })}`}
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

              <div className="flex flex-col items-end">
                {date && <DatePost date={date} lastmod={lastmod} />}

                <DisplayViews slug={slug} />
              </div>
            </div>
          </header>
          <div className="block lg:flex w-full">
            <div className="max-w-full">
              <div className=" w-[40em] lg:w-[37rem] !max-w-full">
                <section className="prose prose-sm sm:prose dark:prose-invert prose-img:rounded-xl !max-w-full mb-10">
                  <MDXRemote {...source} components={MDXComponents} lazy />

                  {published?.url && (
                    <Paragraph className="italic pt-8">
                      {t('posts.published')}{' '}
                      <CustomLink href={published.url} as="span">
                        {published.on}
                      </CustomLink>
                    </Paragraph>
                  )}
                </section>

                <Subscribe />

                {tags && (
                  <aside className="w-full mt-3 print:hidden">
                    <div className="small-title">{t('tags.section')}</div>
                    <Tags tags={tags} />
                  </aside>
                )}

                <section>
                  <h2 className="sr-only">Complementary</h2>

                  {adjacentPosts && <AdjacentPosts posts={adjacentPosts} />}

                  <Webmentions mentions={data?.links} />

                  {relatedPosts.length ? <RelatedPosts relatedPosts={relatedPosts} /> : null}

                  <Comments />
                </section>
              </div>
            </div>

            <div className="flex-auto ml-16 hidden lg:block print:hidden">
              <div className="sticky top-10 w-full">
                {permalink && <Share title={title} tags={tags && tags} permalink={permalink} />}
                {headings && (
                  <aside className="w-full mt-3">
                    <TableOfContents headings={headings} />
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
  const dataType = contentType
  const blogs = getAllPosts(dataType)

  const paths: GetStaticPathsResult['paths'] = []

  blogs.forEach((articles) => {
    const slug = articles.replace(/\.mdx/, '')
    const source = getPost(slug, dataType)

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

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params, locale }) => {
  if (params?.slug) {
    const slug = params.slug as string
    const postContent = await getPostBySlug(slug, contentType, locale)

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
        published,
        preview,
      },
      permalink,
      readingTime,
    } = postContent

    const resp = await fetch(`https://webmention.io/api/count.json?target=${permalink}/`)
    const { type, count } = await resp.json()

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
          preview,
          ...(published && {
            published: {
              on: published.on,
              url: published.url,
            },
          }),
        },
        webmention: {
          likes: type.like + type.repost,
          mentions: type.mention + type.reply,
          total: count,
        },
        permalink,
        slug,
        readingTime,
        headings,
        relatedPosts: locale && JSON.parse(JSON.stringify(getRelatedPosts(slug, locale, tags))),
        adjacentPosts: locale && getAdjacentPosts(slug, locale, contentType),
        source: await serialize(markdownBody, {
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkCodeTitles],
            rehypePlugins: [
              [rehypePrismPlus, { ignoreMissing: true }],
              [rehypeImagePlaceholder, { dir: 'public/' }],
              // [rehypeFigure, { className: 'my-3' }],
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
