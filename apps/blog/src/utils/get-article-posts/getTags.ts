import fs from 'fs'
import path from 'path'

import { CONTENT_TYPE } from '@/constants'

import { collateTags } from './collateTags'

import { ListAllTags } from '@/types'

export type TagsInfo = {
  name: string
  description?: string
  logo?: string
  occurrences?: number
}

export async function getTags(dataType: string, locale?: string): Promise<TagsInfo[]> {
  const tagsInfo = fs.readFileSync(path.join(process.cwd(), 'data', 'tags.json'), 'utf8')

  const tags = {
    articles: await collateTags(CONTENT_TYPE.ARTICLE, 'tags', locale),
    notes: await collateTags(CONTENT_TYPE.NOTE, 'tags', locale),
  }

  const tagsWithDescription = tags[dataType].map((tag: ListAllTags) => {
    const tagData = JSON.parse(tagsInfo).find((tagData: TagsInfo) => tagData.name === tag.name)

    return {
      name: tag.name,
      occurrences: tag.occurrences,
      description: tagData?.description,
      logo: tagData?.logo,
    }
  })

  return tagsWithDescription
}
