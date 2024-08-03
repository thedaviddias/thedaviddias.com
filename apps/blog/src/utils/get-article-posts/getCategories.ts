import { CONTENT_TYPE } from '@/constants'

import { collateTags } from './collateTags'

import { ListAllTags } from '@/types'

export async function getCategories(dataType: string, locale?: string): Promise<ListAllTags[]> {
  const categories: { [key: string]: ListAllTags[] } = {
    articles: await collateTags(CONTENT_TYPE.ARTICLE, 'categories', locale),
  }

  return categories[dataType]
}
