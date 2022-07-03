import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'

import { BlogPost } from '@/types/blog-post'

export const getBlogs = (): string[] => {
  return fs.readdirSync(path.join(process.cwd(), './content/blog'))
}

export const getBlogBySlug = (slug: string): string => {
  return fs.readFileSync(path.join(process.cwd(), './content/blog/', `${slug}.mdx`), 'utf8')
}

export const getBlogsInformation = (limit = 99, locale?: string): Information[] => {
  const blogs = getBlogs()

  return blogs
    .map((blog): Information => {
      const slug = blog.replace(/\.mdx/, '')
      const source = getBlogBySlug(slug)
      const { data, content } = matter(source.trim())

      return {
        ...(data as BlogPost),
        slug,
        readingTime: readingTime(content),
      }
    })
    .filter((blog) => !blog.draft)
    .filter((blog) => blog.locale === locale)
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .filter((_, idx) => idx < limit)
}
