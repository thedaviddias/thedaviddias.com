import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import slugify from 'slugify'

import { PreviousNext } from '@/components/AdjacentPosts'

import { baseUrl } from '@/config/seo'

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
  content: string
  permalink: string
  slug: string
}

export const createPermalink = (filename: string, dataType: string, locale?: string) => {
  const filenameNoExtension = filename.replace('.mdx', '')
  const permalink = `${locale !== 'en' ? `/${locale}` : ''}/${dataType}/${filenameNoExtension}`

  return permalink
}

/**
 * Sort by date descendant
 *
 * @param a - The first date to use to sort
 * @param b - The second date to use to sort
 * @returns
 */
export function dateSortDesc(a: number, b: number) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

/**
 * Gets the list of content files
 *
 * @param dataType - Type of data to be returned
 * @returns - Array of files with .mdx
 */
export const getAllPosts = (dataType: string): string[] => {
  return fs.readdirSync(path.join(process.cwd(), 'content', dataType), 'utf-8')
}

/**
 *
 * @param slug
 * @param dataType
 * @returns
 */
export const getPost = (slug: string, dataType: string) =>
  fs.readFileSync(path.join(process.cwd(), 'content', dataType, `${slug}.mdx`), 'utf8')

/**
 *
 * @param slug
 * @param dataType
 * @returns
 */
export const getPostBySlug = (slug: string, dataType: string, locale?: string) => {
  const source = getPost(slug, dataType)

  const permalink = `${baseUrl}${createPermalink(slug, dataType, locale)}` || ''

  const { data, content } = matter(source)

  return {
    frontMatter: data,
    permalink,
    readingTime: readingTime(content),
    markdownBody: content,
  }
}

type GetAllPostsWithFrontMatter = {
  dataType: string
  filterByTag?: string | null
  filterByCategory?: string | null
  locale?: string
  limit?: number
}

export const getAllPostsWithFrontMatter = ({
  dataType,
  filterByTag = null,
  filterByCategory = null,
  locale = 'en',
  limit = 99,
}: GetAllPostsWithFrontMatter): BlogPostProps[] => {
  const blogs = getAllPosts(dataType)

  const allBlogs = blogs
    .reduce((allPosts: any, filename: string) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'content', dataType, filename),
        'utf8'
      )

      const { data, content } = matter(source)

      const filenameNoExtension = filename.replace('.mdx', '')
      const permalink = createPermalink(filename, dataType, locale)

      if (filterByTag) {
        if (data.tags.includes(filterByTag)) {
          return [
            {
              frontMatter: data,
              permalink,
              slug: filenameNoExtension,
              content,
            },
            ...allPosts,
          ]
        } else {
          return allPosts
        }
      }

      if (filterByCategory) {
        if (data.categories.includes(filterByCategory)) {
          return [
            {
              frontMatter: data,
              permalink,
              slug: filenameNoExtension,
              content,
            },
            ...allPosts,
          ]
        } else {
          return allPosts
        }
      }

      return [
        {
          frontMatter: data,
          readingTime: readingTime(content),
          permalink,
          slug: filenameNoExtension,
          content,
        },
        ...allPosts,
      ]
    }, [])
    .filter((articles: BlogPostProps) =>
      process.env.NODE_ENV !== 'production' ? articles : !articles.frontMatter.draft
    )
    .filter((articles: BlogPostProps) => articles.frontMatter.locale === locale)
    .sort((a: BlogPostProps, b: BlogPostProps) =>
      dateSortDesc(Number(new Date(a.frontMatter.date)), Number(new Date(b.frontMatter.date)))
    )

  return allBlogs.slice(0, limit)
}

export type TagOptions = {
  [key: string]: string[]
}

async function collateTags(dataType: string, type: string, locale = 'en') {
  const files = getAllPosts(dataType)
  const allTags = new Set<string>() // to ensure only unique tags are added

  files.map((postSlug) => {
    const source = fs.readFileSync(path.join(process.cwd(), 'content', dataType, postSlug), 'utf8')

    const { data } = matter(source)

    if (data.locale === locale) {
      if (type === 'tags' && data.tags.length) {
        data.tags && data.tags.forEach((tag: string) => allTags.add(slugify(tag, { lower: true })))
      }

      if (type === 'categories' && data.categories.length) {
        data.categories.forEach((category: string) =>
          allTags.add(slugify(category, { lower: true }))
        )
      }
    }
  })

  return Array.from(allTags)
}

export async function getTags(dataType: string, locale?: string) {
  const tags: TagOptions = {
    articles: await collateTags('articles', 'tags', locale),
    notes: await collateTags('notes', 'tags', locale),
  }

  return tags[dataType]
}

export async function getCategories(dataType: string, locale?: string) {
  const categories: TagOptions = {
    articles: await collateTags('articles', 'categories', locale),
  }

  return categories[dataType]
}

export function getAdjacentPosts(slug: string, locale: string, dataType: string): PreviousNext {
  const allPostHeaders = getAllPostsWithFrontMatter({ dataType, locale })

  const postIndex = allPostHeaders.findIndex((postHeader) => postHeader?.slug === slug)
  return {
    previous:
      postIndex <= 0
        ? null
        : {
            slug: allPostHeaders[postIndex - 1]?.permalink,
            title: allPostHeaders[postIndex - 1]?.frontMatter.title,
          },
    next:
      postIndex >= allPostHeaders.length - 1
        ? null
        : {
            slug: allPostHeaders[postIndex + 1]?.permalink,
            title: allPostHeaders[postIndex + 1]?.frontMatter.title,
          },
  }
}

export const getAllDraftPosts = ({ dataType }: GetAllPostsWithFrontMatter): BlogPostProps[] => {
  const blogs = getAllPosts(dataType)

  const allBlogs = blogs
    .reduce((allPosts: any, filename: string) => {
      const filenameNoExtension = filename.replace('.mdx', '')

      return [
        {
          slug: filenameNoExtension,
        },
        ...allPosts,
      ]
    }, [])
    .filter((articles: BlogPostProps) => articles.frontMatter.draft)

  return allBlogs
}
