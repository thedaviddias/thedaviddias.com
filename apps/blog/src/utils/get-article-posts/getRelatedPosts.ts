import { CONTENT_TYPE } from '@/constants'

import { getAllPostsWithFrontMatter } from './getAllPostsWithFrontMatter'

import { ArticlesType } from '@/types'

export type GetRelatedPosts = ArticlesType & {
  relevance: number
}

export function getRelatedPosts(slug: string, locale: string, tags: string[]) {
  const allPostHeaders = getAllPostsWithFrontMatter({ dataType: CONTENT_TYPE.ARTICLE, locale })
  const allNotesHeaders = getAllPostsWithFrontMatter({ dataType: CONTENT_TYPE.NOTE, locale })
  const allPosts: GetRelatedPosts[] = []

  const posts = [...allPostHeaders, ...allNotesHeaders].filter((aPost) => aPost.slug !== slug)

  const maxPosts = 3

  const listTags = tags?.map((tag) => {
    return tag
  })

  posts
    .map((post) => {
      const postTags =
        post.frontMatter.tags &&
        post.frontMatter.tags
          .map((tag) => {
            return tag
          })
          .filter((tag) => {
            return tag !== ''
          })

      const intersection = listTags?.filter((tag) => {
        return postTags?.includes(tag)
      }).length

      if (intersection > 0) {
        return allPosts.push({
          ...post,
          relevance: intersection,
        })
      }
    })
    // .sort((a, b) => {
    //   return b.relevance - a.relevance
    // })
    .slice(0, maxPosts)

  return allPosts
}
