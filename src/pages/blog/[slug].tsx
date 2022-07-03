import matter from 'gray-matter'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import readingTime from 'reading-time'

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

const BlogPostPage = ({ title, date, source, readingTime, tags, description }: Props) => {
  const { isFallback } = useRouter()

  if (isFallback || !title) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <NextSeo
        openGraph={{
          title: title,
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
      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="prose prose-sm sm:prose dark:prose-light serif:prose-serif !max-w-full hide-first-paragraph">
          {/* {format(date)} */}

          <H1>{title}</H1>

          {readingTime}

          <MDXRemote {...source} components={MDXComponents} />
        </section>
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
      data: { title, description, date, tags },
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
      },
    }
  }
  return {
    notFound: true,
  }
}

export default BlogPostPage
