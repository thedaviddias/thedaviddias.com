import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import slugify from 'slugify'

import { CONTENT_DIR } from '@/constants/paths'

import { getAllPosts } from './getAllPosts'

import { ListAllTags } from '@/types'

export async function collateTags(dataType: string, type: string, locale = 'en') {
  const files = getAllPosts(dataType)
  const listAllTags = [] as ListAllTags[]
  const uniqueTags = new Set()

  files.map((postSlug) => {
    const source = fs.readFileSync(path.join(CONTENT_DIR, dataType, postSlug), 'utf8')

    const { data } = matter(source)

    if (data.locale === locale) {
      if (type === 'tags' && data.tags.length) {
        data.tags.forEach((tag: string) => {
          const tagExists = listAllTags.find((tagItem: ListAllTags) => tagItem.name === tag)

          if (tagExists) {
            tagExists.occurrences = tagExists.occurrences ? tagExists.occurrences + 1 : 1
          } else {
            listAllTags.push({ name: tag, occurrences: 1 })
          }

          listAllTags.push({
            name: slugify(tag, { lower: true }),
            occurrences: tagExists?.occurrences || 0,
          })
        })
      } else if (type === 'categories' && data.categories.length) {
        data.categories.forEach((category: string) => {
          const categoryExists = listAllTags.find(
            (tagItem: ListAllTags) => tagItem.name === category
          )

          if (categoryExists) {
            categoryExists.occurrences = categoryExists.occurrences
              ? categoryExists.occurrences + 1
              : 1
          } else {
            listAllTags.push({ name: category, occurrences: 1 })
          }

          listAllTags.push({
            name: slugify(category, { lower: true }),
            occurrences: categoryExists?.occurrences || 0,
          })
        })
      }
    }
  })

  const filteredArr = listAllTags
    .filter((el) => {
      const duplicate = uniqueTags.has(el.name)
      uniqueTags.add(el.name)
      return !duplicate
    })
    .sort((a: ListAllTags, b: ListAllTags) => {
      if (a.occurrences > b.occurrences) return -1
      if (a.occurrences < b.occurrences) return 1
      return 0
    })

  return Array.from(filteredArr)
}
