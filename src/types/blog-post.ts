export type BlogPost = {
  frontMatter: {
    title: string
    description: string
    date: string
    locale: string
    tags: string[]
    categories: string[]
    lastmod?: string
  }
  slug: string
}
