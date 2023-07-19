import matter from 'gray-matter'
import readingTime from 'reading-time'

import { BASE_URL } from '@/constants'

import { createPermalink } from './createPermalink'
import { getPost } from './getPost'

/**
 *
 * @param slug
 * @param dataType
 * @returns
 */
export const getPostBySlug = (slug: string, dataType: string, locale?: string) => {
  const source = getPost(slug, dataType)

  const permalink = `${BASE_URL}${createPermalink(slug, dataType, locale)}` || ''

  const { data, content } = matter(source)

  return {
    frontMatter: data,
    permalink,
    readingTime: readingTime(content),
    markdownBody: content,
  }
}
