import { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import useTranslation from 'next-translate/useTranslation'

import { H3 } from '@/components/Headings'
import { MDXComponents } from '@/components/MdxComponents'
import { PageHeader } from '@/components/PageHeader'
import { ToolCard } from '@/components/ToolCard'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getPostBySlug } from '@/utils/get-articles-posts'
import { readData } from '@/utils/read-data'

export type Tool = {
  title: string
  description_en: string
  description_fr: string
  url: string
  image: string
  category_en: string
  category_fr: string
}

type UsesProps = {
  categories: string[]
  tools: any[]
  frontMatter: {
    title: string
    description: string
  }
  source: MDXRemoteSerializeResult
}

const Uses: NextPage<UsesProps> = ({ categories, tools, frontMatter, source }) => {
  const { t } = useTranslation('common')
  const { title, description } = frontMatter

  const titlePage = title
  const descriptionPage = description

  return (
    <BaseLayout
      title={titlePage}
      description={descriptionPage}
      openGraph={routes(t).about.seo}
      className="pt-10 border-none"
    >
      <PageHeader title={titlePage} description={descriptionPage} />

      <MDXRemote {...source} components={MDXComponents} lazy />

      {categories?.map((category) => (
        <section key={category} className="flex flex-col mt-5 mb-8">
          <header className="pb-5">
            <H3 as="h2">{category}</H3>
          </header>

          <div className="flex flex-col">
            {tools[category as unknown as number].map((tool: Tool, i: number) => (
              <ToolCard key={i} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </BaseLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postContent = await getPostBySlug('uses', 'pages', locale)
  const usesData = await readData<Tool[]>('data/uses.json')

  const {
    markdownBody,
    frontMatter: { title, description },
  } = postContent

  const tools: { [key: string]: Tool[] } = {}
  const category = `category_${locale}` as keyof Tool

  usesData?.forEach((tool) => {
    if (!tools[tool[category]]) {
      tools[tool[category]] = []
    }

    tools[tool[category]] = [...tools[tool[category]], tool]
  })

  const categories = Object.keys(tools)

  const props = {
    frontMatter: {
      title,
      description,
    },
    source: await serialize(markdownBody),
    tools,
    categories,
  }

  return {
    props,
  }
}

export default Uses
