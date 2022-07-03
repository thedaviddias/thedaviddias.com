import { getAllPosts } from './getAllPosts'

import { ArticlesType, GetAllPostsWithFrontMatter } from '@/types'

export const getAllDraftPosts = ({ dataType }: GetAllPostsWithFrontMatter): ArticlesType[] => {
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
    .filter((articles) => articles.frontMatter.draft)

  return allBlogs
}
