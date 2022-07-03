import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'

import { CONTENT_DIR } from '@/constants/paths'

import { createPermalink } from './createPermalink'
import { dateSortDesc } from './dateSortDesc'
import { getAllPosts } from './getAllPosts'

import { ArticlesType, GetAllPostsWithFrontMatter } from '@/types'

export const getAllPostsWithFrontMatter = ({
  dataType,
  filterByTag = null,
  filterByCategory = null,
  locale = 'en',
  limit = 99,
}: GetAllPostsWithFrontMatter): ArticlesType[] => {
  const blogs = getAllPosts(dataType)

  const allBlogs = blogs
    .reduce((allPosts: any[], filename: string) => {
      const source = fs.readFileSync(path.join(CONTENT_DIR, dataType, filename), 'utf8')

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
    .filter((articles: ArticlesType) => !articles.frontMatter.draft)
    .filter((articles: ArticlesType) => articles.frontMatter.locale === locale)
    .sort((a: ArticlesType, b: ArticlesType) =>
      dateSortDesc(Number(new Date(a.frontMatter.date)), Number(new Date(b.frontMatter.date)))
    )

  return allBlogs.slice(0, limit)
}
