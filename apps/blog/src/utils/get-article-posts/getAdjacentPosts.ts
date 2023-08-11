import { PreviousNext } from '@/components/AdjacentPosts'

import { getAllPostsWithFrontMatter } from './getAllPostsWithFrontMatter'

export function getAdjacentPosts(slug: string, locale: string, dataType: string): PreviousNext {
  const allPostHeaders = getAllPostsWithFrontMatter({ dataType, locale })
  const postIndex = allPostHeaders.findIndex((postHeader) => postHeader.slug === slug)
  const previousIndex = postIndex - 1
  const nextIndex = postIndex + 1

  const previousPost =
    previousIndex >= 0
      ? {
          slug: allPostHeaders[previousIndex].permalink,
          title: allPostHeaders[previousIndex].frontMatter.title,
          image: allPostHeaders[previousIndex]?.frontMatter?.preview?.url || '',
          alt: allPostHeaders[nextIndex]?.frontMatter?.preview?.alt || '',
        }
      : null

  const nextPost =
    nextIndex < allPostHeaders.length
      ? {
          slug: allPostHeaders[nextIndex].permalink,
          title: allPostHeaders[nextIndex].frontMatter.title,
          image: allPostHeaders[nextIndex]?.frontMatter?.preview?.url || '',
          alt: allPostHeaders[nextIndex]?.frontMatter?.preview?.alt || '',
        }
      : null

  return { previous: previousPost, next: nextPost }
}
