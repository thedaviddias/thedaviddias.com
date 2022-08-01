import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'
import { H2, H3, H4, H5 } from '@/components/Headings'
import { MDXComponents } from '@/components/MdxComponents'
import { PageHeader } from '@/components/PageHeader'
import { Paragraph } from '@/components/Paragraph'

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
  categories: string
  tools: Tool[]
  frontMatter: {
    title: string
    description: string
  }
  source: MDXRemoteSerializeResult
}

const Uses: NextPage<UsesProps> = ({ categories, tools, frontMatter, source }) => {
  const { t, lang } = useTranslation('common')
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
          <ul className="flex flex-col">
            {tools[category].map((tool) => (
              <li key={tool.url}>
                <article className="flex flex-row relative gap-x-5">
                  <div>
                    <Image
                      alt={`Thumbnail of ${tool.title}`}
                      src={tool.image}
                      width="75"
                      height="75"
                    />
                  </div>
                  <div>
                    <H5 as="h3">
                      <CustomLink
                        href={tool.url}
                        className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 font-medium dark:!text-white"
                      >
                        {tool.title}
                      </CustomLink>
                    </H5>
                    <Paragraph>{tool[`description_${lang}`]}</Paragraph>
                  </div>
                </article>
              </li>
            ))}
          </ul>
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
  const category = `category_${locale}`

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
