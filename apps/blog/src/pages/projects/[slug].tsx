import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { ReadTimeResults } from 'reading-time'
import wordsCounter from 'word-counting'

import { Author } from '@/components/Author'
import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { DatePost } from '@/components/DatePost'
import { DisplayViews } from '@/components/DisplayViews'
import { H1 } from '@/components/Headings'
import { Loader } from '@/components/Loader'
import { MDXComponents } from '@/components/MdxComponents'
import { Paragraph } from '@/components/Paragraph'
import { ScrollTop } from '@/components/ScrollTop'

import { routes } from '@/config/routes'
import { BASE_URL, CLOUDINARY_IMG_HEIGHT, CLOUDINARY_IMG_WIDTH } from '@/constants'
import { getAllPosts } from '@/utils/get-article-posts/getAllPosts'
import { getPost } from '@/utils/get-article-posts/getPost'
import { getPostBySlug } from '@/utils/get-article-posts/getPostBySlug'
import { serializeMarkdown } from '@/utils/serializeMarkdown'

const Comments = dynamic<object>(
  () => import('../../components/Comments').then((mod) => mod.Comments),
  {
    loading: () => <Loader />,
  }
)

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
  plainText: string
}

export type Headings = {
  id: string
  title: string
}

type BlogPostPageProps = BlogPostProps & {
  source: MDXRemoteSerializeResult
  readingTime: ReadTimeResults
  headings: Headings[]
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

const contentType = 'projects'

const ProjectPage: NextPage<BlogPostPageProps> = ({
  frontMatter,
  source,
  permalink,
  slug,
  plainText,
}) => {
  const { title, description, tags, date, lastmod, author, published, preview } = frontMatter
  const { isFallback } = useRouter()
  const { t, lang } = useTranslation('common')

  if (isFallback || !title) {
    return <Loader />
  }

  return (
    <Container>
      <ScrollTop />
      <NextSeo
        title={title}
        description={description}
        titleTemplate={'%s | David Dias'}
        openGraph={{
          title,
          description,
          url: permalink,
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: lastmod,
            authors: [`https://thedaviddias.com/about`],
            tags,
          },
          images: [
            {
              url: `${BASE_URL}${preview.url}`,
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
        images={[`${BASE_URL}${preview.url}`]}
        datePublished={date}
        dateModified={lastmod}
        description={description}
        wordCount={wordsCounter(plainText).wordsCount}
        articleBody={plainText}
        inLanguage={lang}
        keywords={tags?.join(',')}
        authorName={[
          {
            name: 'David Dias',
            url: 'https://thedaviddias.com',
          },
        ]}
        publisherName="David Dias"
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Projects',
            item: `${BASE_URL}/projects`,
          },
          {
            position: 2,
            name: title,
            item: permalink,
          },
        ]}
      />
      <main id="main" data-skip-link="the article">
        <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8 border-b border-gray-200 pb-6 text-center transition-colors duration-200 dark:border-gray-800">
            {/* {categories.length && (
              <div className="text-gray-500 dark:text-gray-400 font-medium mb-2 text-sm sm:text-base transition-colors duration-200">
                <span className="sr-only">Category</span>
                {categories?.map((category) => (
                  <CustomLink
                    key={category}
                    href={`${t('category.path')}/${slugify(category, { lower: true })}`}
                    className="mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x md:text-lg !font-semibold transition-colors duration-200"
                  >
                    {category}
                  </CustomLink>
                ))}
              </div>
            )} */}
            <H1>
              <span className="serif:mt-2 mb-6 mt-1.5 block leading-none text-black transition-colors duration-200 dark:text-white ">
                {title}
              </span>
              <span className="sr-only"> — </span>
              <div className="font-body mb-6 mt-3 text-base font-light tracking-wide text-gray-600 sm:text-lg dark:text-gray-300">
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
          <div className="block w-full lg:flex">
            <div className="max-w-full">
              <div className="max-w-full">
                <section className="prose prose-sm sm:prose dark:prose-invert prose-img:rounded-xl mb-10 !max-w-full break-words">
                  <MDXRemote {...source} components={MDXComponents} lazy />

                  {published?.url && (
                    <Paragraph className="pt-8 italic">
                      {t('posts.first_published')}{' '}
                      <CustomLink href={published.url} as="span">
                        {published.on}
                      </CustomLink>
                    </Paragraph>
                  )}
                </section>

                <section>
                  <Comments />
                </section>
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
  const projects = getAllPosts(dataType)

  const paths: GetStaticPathsResult['paths'] = []

  projects.forEach((articles) => {
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (params?.slug) {
    const slug = params.slug as string
    const postContent = await getPostBySlug(slug, contentType, locale)

    const headings: Headings[] = []

    const {
      markdownBody,
      frontMatter: { title, description, date, lastmod, author, published, preview },
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
        source: (await serializeMarkdown(markdownBody)).mdxSource,
        plainText: (await serializeMarkdown(markdownBody)).plainText,
      },
    }
  }
  return {
    notFound: true,
  }
}

export default ProjectPage
