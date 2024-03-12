import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { ReadTimeResults } from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeImagePlaceholder from 'rehype-image-placeholder'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

import { AdjacentPostsProps, PreviousNext } from '@/components/AdjacentPosts'
import { Author } from '@/components/Author'
import { Container } from '@/components/Container'
import { DatePost } from '@/components/DatePost'
import { H1 } from '@/components/Headings'
import { Loader } from '@/components/Loader'
import { MDXComponents } from '@/components/MdxComponents'
import { ScrollTop } from '@/components/ScrollTop'
import { ShareProps } from '@/components/Share'
import { Tags } from '@/components/Tags'

import { routes } from '@/config/routes'
import { BASE_URL, CLOUDINARY_IMG_HEIGHT, CLOUDINARY_IMG_WIDTH } from '@/constants'
import { getAdjacentPosts } from '@/utils/get-article-posts/getAdjacentPosts'
import { getAllPosts } from '@/utils/get-article-posts/getAllPosts'
import { getPost } from '@/utils/get-article-posts/getPost'
import { getPostBySlug } from '@/utils/get-article-posts/getPostBySlug'
import { remarkCodeTitles } from '@/utils/remark-code-titles'

const Comments = dynamic<object>(
  () => import('../../components/Comments').then((mod) => mod.Comments),
  {
    loading: () => <Loader />,
  }
)

const AdjacentPosts = dynamic<AdjacentPostsProps>(
  () => import('../../components/AdjacentPosts').then((mod) => mod.AdjacentPosts),
  {
    loading: () => <Loader />,
  }
)

const BuyMeACoffee = dynamic(
  () => import('../../components/BuyMeACoffee').then((mod) => mod.BuyMeACoffee),
  {
    loading: () => <Loader />,
  }
)

const Share = dynamic<ShareProps>(() => import('../../components/Share').then((mod) => mod.Share), {
  loading: () => <Loader />,
})

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
  adjacentPosts: PreviousNext
}

const contentType = 'notes'

const NotePage: NextPage<NotePageProps> = ({ frontMatter, source, permalink, adjacentPosts }) => {
  const { title, description, tags, date, author } = frontMatter
  const { isFallback } = useRouter()

  if (isFallback || !title) {
    return <Loader />
  }

  const imageOg = `api/og?title=${title}&description=${description}&=author='David Dias'`

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
            authors: ['https://thedaviddias.com/about'],
            tags,
          },
          images: [
            {
              url: imageOg,
              width: CLOUDINARY_IMG_WIDTH,
              height: CLOUDINARY_IMG_HEIGHT,
              alt: '',
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={permalink}
        title={title}
        images={[]}
        datePublished={date}
        authorName={[
          {
            name: 'David Dias',
            url: 'https://thedaviddias.com',
          },
        ]}
        publisherName="David Dias"
        description={description}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Notes',
            item: `${BASE_URL}/notes`,
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
          <header className="mb-8 border-b border-gray-200 pb-6 text-center transition-colors duration-200 dark:border-gray-700">
            {tags && (
              <aside className="print:hidden">
                <Tags tags={tags} className="mx-auto justify-center" />
              </aside>
            )}
            <H1>
              <span className="serif:mt-2 mb-6 mt-1.5 block leading-none text-black transition-colors duration-200 dark:text-white ">
                {title}
              </span>
            </H1>

            <div className="mx-auto mt-16 flex justify-between">
              {author && <Author name={author} routes={routes} />}

              {date && <DatePost date={date} />}
            </div>
          </header>

          <div className="max-w-full">
            <div className="mx-auto lg:w-[37rem]">
              <section className="prose prose-sm sm:prose dark:prose-invert prose-img:rounded-xl mb-10 !max-w-full">
                <MDXRemote {...source} components={MDXComponents} lazy />
              </section>
              {permalink && <Share title={title} permalink={permalink} />}

              <BuyMeACoffee />

              {adjacentPosts && <AdjacentPosts posts={adjacentPosts} />}

              {/* <Webmentions mentions={data?.links} /> */}

              <Comments />
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
            remarkPlugins: [remarkGfm, remarkCodeTitles, remarkUnwrapImages],
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
