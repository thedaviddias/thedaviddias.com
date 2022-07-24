import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import slugify from 'slugify'

import { BlogPostProps } from '@/pages/blog/[slug]'

/**
 * Gets the list of content files
 *
 * @param dataType - Type of data to be returned
 * @returns - Array of files with .mdx
 */
export const getAllPosts = (dataType: string): string[] => {
  return fs.readdirSync(path.join(process.cwd(), 'content', dataType), 'utf-8')
}

export const getPost = (slug: string, dataType: string) =>
  fs.readFileSync(path.join(process.cwd(), 'content', dataType, `${slug}.mdx`), 'utf8')

export const getPostBySlug = (slug: string, dataType: string) => {
  const source = getPost(slug, dataType)

  const { data, content } = matter(source)

  return {
    frontMatter: data,
    readingTime: readingTime(content),
    markdownBody: content,
  }
}

export const readBlogPost = (slug: string): string => {
  return fs.readFileSync(path.join(process.cwd(), './content/blog/', `${slug}.mdx`), 'utf8')
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
}: GetAllPostsWithFrontMatter): BlogPostProps => {
  const blogs = getAllPosts(dataType)

  return blogs
    .reduce((allPosts, filename) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'content', dataType, filename),
        'utf8'
      )
      const { data, content } = matter(source)

      const filenameNoExtension = filename.replace('.mdx', '')
      const permalink = `/${dataType}/${filenameNoExtension}`

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
    .sort((a, b) => Number(new Date(b.frontMatter.date)) - Number(new Date(a.frontMatter.date)))
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
