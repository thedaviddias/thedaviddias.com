import { ReadTimeResults } from 'reading-time'

export interface StatusIndicatorProps {
  status: 'idea' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled'
}

type ProjectProps = {
  projects_type: string
  status: StatusIndicatorProps['status']
  progress: string
}

type CommonProps = {
  tags?: string[]
  categories: string[]
}

type ExtraProps<Type extends 'article' | 'note' | 'project'> = Type extends 'project'
  ? ProjectProps
  : Type extends 'article' | 'note'
  ? CommonProps
  : Record<string, never>

export type FrontMatterType<Type extends 'article' | 'note' | 'project'> = {
  type: Type
  draft: boolean
  author?: string
  date: string
  description: string
  lastmod?: string
  locale: string
  permalink: string
  title: string
  preview: {
    url: string
  }
  published?: {
    on: string
    url: string
  }
} & ExtraProps<Type>

export type ArticleFrontMatterType = FrontMatterType<'article'>
export type NoteFrontMatterType = FrontMatterType<'note'>
export type ProjectFrontMatterType = FrontMatterType<'project'>

export type ProjectsType = {
  frontMatter: ProjectFrontMatterType
  content: string
  permalink: string
  slug: string
}

export type ArticlesType = {
  frontMatter: ArticleFrontMatterType
  content: string
  permalink: string
  slug: string
  readingTime: ReadTimeResults
}

export type NotesType = {
  frontMatter: NoteFrontMatterType
  content: string
  permalink: string
  slug: string
  readingTime: ReadTimeResults
}

export type UsesType = {
  title: string
  url: string
  description_en: string
  description_fr: string
  category_en: string
  category_fr: string
  image: string
}

export type SupportersType = {
  category_en: string
  category_fr: string
  image?: string
  name: string
  type?: string
  url?: string
  username?: string
}

export type ListAllTags = {
  name: string
  occurrences: number
}

export type YouTubeVideo = {
  id: string
  title: string
  url: string
}

export type GetAllPostsWithFrontMatter = {
  dataType: string
  filterByTag?: string | null
  filterByCategory?: string | null
  locale?: string
  limit?: number
}
