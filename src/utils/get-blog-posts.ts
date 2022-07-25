import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import slugify from 'slugify'

import { BlogPostProps } from '@/pages/blog/[slug]'

export const createPermalink = (filename, dataType) => {
  const filenameNoExtension = filename.replace('.mdx', '')
  const permalink = `/${dataType}/${filenameNoExtension}`

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
export const getPostBySlug = (slug: string, dataType: string) => {
  const source = getPost(slug, dataType)

  const permalink = `/${dataType}/${slug}`

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

  return blogs
    .reduce((allPosts, filename) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'content', dataType, filename),
        'utf8'
      )

      const { data, content } = matter(source)

      const filenameNoExtension = filename.replace('.mdx', '')
      const permalink = createPermalink(filename, dataType)

      if (filterByTag) {
        if (data.tags.includes(filterByTag)) {
          return [
            {
              frontMatter: data,
              permalink,
              slug: filenameNoExtension,
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
        },
        ...allPosts,
      ]
    }, [])
    .filter((blog) => !blog.frontMatter.draft)
    .filter((blog) => blog.frontMatter.locale === locale)
    .filter((_, index) => index < limit)
    .sort((a, b) => dateSortDesc(Number(new Date(a.frontMatter.date)), Number(new Date(b.frontMatter.date))))
}

export type TagOptions = {
  [key: string]: string[]
}

async function collateTags(dataType: string, type: string) {
  const files = getAllPosts(dataType)
  const allTags = new Set<string>() // to ensure only unique tags are added

  files.map((postSlug) => {
    const source = fs.readFileSync(path.join(process.cwd(), 'content', dataType, postSlug), 'utf8')
    const { data } = matter(source)

    if (type === 'tags') {
      data.tags.forEach((tag: string) => allTags.add(slugify(tag, { lower: true })))
    }

    if (type === 'categories') {
      data.categories.forEach((category: string) => allTags.add(slugify(category, { lower: true })))
    }
  })

  return Array.from(allTags)
}

export async function getTags(dataType: string) {
  const tags: TagOptions = {
    blog: await collateTags('blog', 'tags'),
  }

  return tags[dataType]
}

export async function getCategories(dataType: string) {
  const categories: TagOptions = {
    blog: await collateTags('blog', 'categories'),
  }

  return categories[dataType]
}

export interface AdjacentPosts {
  previous: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}

export function getAdjacentPosts(slug: string): AdjacentPosts {
  const allPostHeaders = getAllPostsWithFrontMatter({ dataType: 'blog' })

  const postIndex = allPostHeaders.findIndex((postHeader) => postHeader?.slug === slug)
  return {
    previous:
      postIndex <= 0
        ? null
        : {
            slug: allPostHeaders[postIndex - 1]!.permalink,
            title: allPostHeaders[postIndex - 1]!.frontMatter.title,
          },
    next:
      postIndex >= allPostHeaders.length - 1
        ? null
        : {
            slug: allPostHeaders[postIndex + 1]!.permalink,
            title: allPostHeaders[postIndex + 1]!.frontMatter.title,
          },
  }
}
