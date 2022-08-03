import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { ReadTimeResults } from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeImagePlaceholder from 'rehype-image-placeholder'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { AdjacentPosts } from '@/components/AdjacentPosts'
import { Author } from '@/components/Author'
import { Container } from '@/components/Container'
import { DatePost } from '@/components/DatePost'
import { H1 } from '@/components/Headings'
import { MDXComponents } from '@/components/MdxComponents'
import { ScrollTop } from '@/components/ScrollTop'
import { Share } from '@/components/Share'
import { Tags } from '@/components/Tags'

import { routes } from '@/config/routes'
import { getAdjacentPosts, getAllPosts, getPost, getPostBySlug } from '@/utils/get-articles-posts'
import { remarkCodeTitles } from '@/utils/remark-code-titles'

export type BlogPostProps = {
  frontMatter: {
    author?: string
    date: string
    description: string
    draft: boolean
    locale: string
    permalink: string
    tags?: string[]
    title: string
  }
  permalink: string
  slug: string
}

export type Headings = {
  id: string
  title: string
}

type NotePageProps = BlogPostProps & {
  source: MDXRemoteSerializeResult
  readingTime: ReadTimeResults
  adjacentPosts: any
}

const contentType = 'notes'

const NotePage: NextPage<NotePageProps> = ({ frontMatter, source, permalink, adjacentPosts }) => {
  const { title, description, tags, date, author } = frontMatter
  const { isFallback } = useRouter()

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
            authors: ['https://thedaviddias.dev/authors/@david-dias'],
            tags,
          },
          images: [],
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={permalink}
        title={title}
        images={[]}
        datePublished={date}
        authorName="David Dias"
        description={description}
      />
      <main id="main" data-skip-link="the article">
        <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="pb-6 text-center border-b border-gray-200 dark:border-gray-700 mb-8 transition-colors duration-200">
            {tags && (
              <aside className="print:hidden">
                <Tags tags={tags} className="mx-auto justify-center" />
              </aside>
            )}
            <H1>
              <span className="block mt-1.5 mb-6 serif:mt-2 text-black dark:text-white leading-none transition-colors duration-200 ">
                {title}
              </span>
            </H1>

            <div className="flex justify-between mx-auto mt-16">
              {author && <Author name={author} routes={routes} />}

              {date && <DatePost date={date} />}
            </div>
          </header>

          <div className="max-w-full">
            <div className="lg:w-[37rem] mx-auto">
              <section className="prose prose-sm sm:prose dark:prose-invert prose-img:rounded-xl !max-w-full mb-10">
                <MDXRemote {...source} components={MDXComponents} lazy />
              </section>
              {permalink && <Share title={title} tags={tags && tags} permalink={permalink} />}

              {adjacentPosts && <AdjacentPosts posts={adjacentPosts} />}
            </div>
          </div>
        </article>
      </main>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataType = contentType
  const notes = getAllPosts(dataType)

  const paths: GetStaticPathsResult['paths'] = []

  notes.forEach((note) => {
    const slug = note.replace(/\.mdx/, '')
    const source = getPost(slug, dataType)

    const { data } = matter(source.trim())

    if (!data.draft && process.env.NODE_ENV !== 'production') {
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

    const {
      markdownBody,
      frontMatter: { title, description, tags, date, author },
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
          author: author || null,
        },
        permalink,
        slug,
        readingTime,
        adjacentPosts: locale && getAdjacentPosts(slug, locale, contentType),
        source: await serialize(markdownBody, {
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkCodeTitles],
            rehypePlugins: [
              [rehypePrismPlus, { ignoreMissing: true }],
              [rehypeImagePlaceholder, { dir: 'public/' }],
              rehypeSlug,
              [rehypeAutolinkHeadings],
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

export default NotePage
