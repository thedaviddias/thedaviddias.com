import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import slugify from 'slugify'

import { BlogPost } from '@/types/blog-post'

type getAllPosts = {}

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

export const test = (slug: string): string => {
  return fs.readFileSync(path.join(process.cwd(), './content/blog/', `${slug}.mdx`), 'utf8')
}

type GetAllPostsWithFrontMatter = {
  dataType: string
  filterByTag?: string | null
  locale?: string
  limit?: number
}

export const getAllPostsWithFrontMatter = ({
  dataType,
  filterByTag = null,
  locale = 'en',
  limit = 99,
}: GetAllPostsWithFrontMatter) => {
  const blogs = getAllPosts(dataType)

  return blogs
    .reduce((allPosts, postSlug) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'content', dataType, postSlug),
        'utf8'
      )
      const { data, content } = matter(source)

      console.log('filterByTag', data.tags)

      if (filterByTag) {
        if (data.tags.includes(filterByTag)) {
          return [
            {
              frontMatter: data,
              slug: postSlug.replace('.mdx', ''),
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
          slug: postSlug.replace('.mdx', ''),
        },
        ...allPosts,
      ]
    }, [])
    .filter((blog) => !blog.frontMatter.draft)
    .filter((blog) => blog.frontMatter.locale === locale)
    .sort(
      (a, b) =>
        Number(new Date(b.frontMatter.publishedAt)) - Number(new Date(a.frontMatter.publishedAt))
    )
    .filter((_, index) => index < limit)
}

export type TagOptions = {
  [key: string]: string[]
}

async function collateTags(dataType: string) {
  const files = getAllPosts(dataType)
  const allTags = new Set<string>() // to ensure only unique tags are added

  files.map((postSlug) => {
    const source = fs.readFileSync(path.join(process.cwd(), 'content', dataType, postSlug), 'utf8')
    const { data } = matter(source)

    data.tags.forEach((tag: string) => allTags.add(slugify(tag, { lower: true })))
  })

  return Array.from(allTags)
}

export async function getTags(dataType: string) {
  const tags: TagOptions = {
    blog: await collateTags('blog'),
  }

  return tags[dataType]
}
